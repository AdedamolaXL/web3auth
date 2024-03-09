'use client'
import { CustomChainConfig, IProvider, ADAPTER_EVENTS, WALLET_ADAPTERS, WEB3AUTH_NETWORK_TYPE, CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { PLUGIN_EVENTS } from "@web3auth/base-plugin";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState, FunctionComponent } from "react";

import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "./config/chainConfig";  
import { getWalletProvider, IWalletProvider } from "./services/walletProvider";

export interface IWeb3AuthContext {
    web3Auth: Web3Auth | null;
    provider: IWalletProvider | null;
    isLoading: boolean;
    user: unknown;
    chain: string;
    account: string;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getAccounts: () => Promise<string>;
    randomContractInteraction: () => Promise<void>;
    goalContract: (target: string, stake: number, updates: number, deadline: number) => Promise<void>;
} 
export const Web3AuthContext = createContext<IWeb3AuthContext>({
    web3Auth: null,
    provider: null,
    isLoading: false,
    user: null,
    chain: "",
    account: "",
    login: async () => {},
    logout: async () => {},
    getAccounts: async () => {
      return '';
    },
    randomContractInteraction: async () => {},
    goalContract: async () => {},
});

export function useWeb3Auth(): IWeb3AuthContext {
    return useContext(Web3AuthContext);
}

interface IWeb3AuthState {
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
    chain: CHAIN_CONFIG_TYPE;
    children?: React.ReactNode;
}

interface IWeb3AuthProps {
    children?: ReactNode;
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
    chain: CHAIN_CONFIG_TYPE;
}







export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({ children, web3AuthNetwork, chain }: IWeb3AuthProps) => {
    
    const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<IWalletProvider | null>(null);
    const [walletServicesPlugin, setWalletServicesPlugin] = useState<WalletServicesPlugin | null>(null);
    const [user, setUser] = useState<unknown | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState<string>('');


    const setWalletProvider = useCallback(
        (web3authProvider: IProvider) => {
            const walletProvider = getWalletProvider(chain, web3authProvider, uiConsole);
            setProvider(walletProvider);
        },
        [chain]
    );
    
    useEffect(() => {
        const subscribeAuthEvents = (web3auth: Web3Auth) => {
            web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
                console.log('Yeah! you are succesfully logged in', data);
                setUser(data);
                setWalletProvider(web3auth.provider!);
            });

            web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("connecting");
            });

            web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log('disconnected');
                setUser(null);
            });

            web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.error('some error or user has cancelled login request', error);
            });
        };

        const subscribePluginEvents = (plugin: WalletServicesPlugin) => {
            
            // can subscribe to all plugin_events and login_modal_events
            plugin.on(PLUGIN_EVENTS.CONNECTED, (data: unknown) => {
                console.log('Yeah!, you are successfully logged in to plugin');
            });

            plugin.on(PLUGIN_EVENTS.CONNECTING, () => {
                console.log('connecting plugin');
            });

            plugin.on(PLUGIN_EVENTS.DISCONNECTED, () => {
                console.log('plugin disconnected');
            });

            plugin.on(PLUGIN_EVENTS.ERRORED, (error) => {
                console.error('some error on plugin login', error);
            });
        };

        async function init() {
            try {
                const currentChainConfig = CHAIN_CONFIG[chain];
                let privateKeyProvider;
                if (currentChainConfig.chainNamespace === CHAIN_NAMESPACES.EIP155) {
                    privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig: currentChainConfig }});
                } else {
                    privateKeyProvider = new EthereumPrivateKeyProvider({ config: {chainConfig: currentChainConfig }});
                }
                setIsLoading(true);
                
                const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_ID || '';

                const web3AuthInstance = new Web3Auth({
                    clientId,
                    web3AuthNetwork,
                    privateKeyProvider,
                    chainConfig: currentChainConfig,
                    uiConfig: {
                        uxMode: 'redirect',
                        appName: 'ASCENDING',
                        appUrl: 'https://web3auth.io',
                        theme: {
                            primary: "#5f27cd",
                            onPrimary: "white",
                        },
                        logoDark: 'https://web3auth.io/images/web3auth-logo.svg',
                        logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
                        defaultLanguage: 'en',
                        mode: 'auto',
                        loginGridCol: 3,
                        primaryButton: 'externalLogin',
                    },
                    enableLogging: true,
                });
                const openloginAdapter = new OpenloginAdapter({
                    loginSettings: {
                        mfaLevel: 'optional',
                    },
                    adapterSettings: {
                        buildEnv: 'testing',
                        whiteLabel: {
                            logoLight: 'https://web3auth.io/images/web3auth-logo.svg',
                            logoDark: 'https://web3auth.io/images/web3auth-logo.svg',
                            defaultLanguage: 'en',
                            mode: 'dark',
                        },
                        mfaSettings: {
                            deviceShareFactor: {
                                enable: true,
                                priority: 1,
                                mandatory: true,
                            },
                            backUpShareFactor: {
                                enable: true,
                                priority: 2,
                                mandatory: false,
                            },
                            socialBackupFactor: {
                                enable: true,
                                priority: 4,
                                mandatory: false,
                            },
                        },
                        loginConfig: {
                            google: {
                                verifier: 'w3a-google-demo',
                                clientId: "519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com",
                                typeOfLogin: "google",
                            },
                        },
                    },
                });
                web3AuthInstance.configureAdapter(openloginAdapter);

                // Wallet Services Plugin
                if (currentChainConfig.chainNamespace !== CHAIN_NAMESPACES.EIP155) {
                    const walletServicesPlugin = new WalletServicesPlugin({
                        wsEmbedOpts: {},
                        walletInitOptions: {
                            whiteLabel: { showWidgetButton: true},
                        },
                    });
                    subscribePluginEvents(walletServicesPlugin);
                    setWalletServicesPlugin(walletServicesPlugin);
                    web3AuthInstance.addPlugin(walletServicesPlugin);
                }
                
                //For external Adapters, like metamask
                const adapters = await getDefaultExternalAdapters({
                    options: {
                        clientId,
                        chainConfig: currentChainConfig,
                        sessionTime: 86400,
                        web3AuthNetwork,
                        // useCoreKitKey: true,
                    }
                });
                adapters.forEach((adapter) => {
                    web3AuthInstance?.configureAdapter(adapter);
                });


                subscribeAuthEvents(web3AuthInstance);
                setWeb3Auth(web3AuthInstance);
                await web3AuthInstance.initModal({
                    modalConfig: {
                        [WALLET_ADAPTERS.OPENLOGIN]: {
                            label: 'openlogin',
                            loginMethods: {
                                google: {
                                    name: 'google',
                                    showOnModal: true,
                                    mainOption: true,
                                },
                                // disable apple login
                                apple: {
                                    name: 'apple',
                                    showOnModal: false,
                                },
                            },
                            showOnModal: true,
                        },
                    },
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, [chain, web3AuthNetwork, setWalletProvider]);

    const login = async () => {
        if (!web3Auth) {
            console.log('web3auth not initialized yet');
            uiConsole('web3auth not initialized yet');
            return;
        }
        const localProvider = await web3Auth.connect();
        setWalletProvider(localProvider!);
    };

    const logout = async () => {
        if (!web3Auth) {
            console.log('web3auth not initialized yet');
            uiConsole('web3auth not initialized yet');
            return;
        }
        await web3Auth.logout();
        setProvider(null);
    };


    const getAccounts = async (): Promise<string> => {
        if (!provider) {
            console.log('provider not initialized yet');
            uiConsole('provider not initialized yet');
            return '';
        }
        const account = await provider.getAccounts();
        console.log(account);
        
        if(account) {
          setAccount(account); 
          return account;
        } else {
          console.error('Failed to get account')
          return '';
        }
    }

    const randomContractInteraction = async () => {
        if (!provider) {
            console.log('provider not initialized');
            uiConsole('provider not initialized');
            return;
        }
        await provider.randomContractInteraction?.();
    }
    const goalContract = async (target: string, stake: number, updates: number, deadline: number) => {
        if (!provider) {
            console.log('provider not initialized yet');
            uiConsole('provider not initialized yet');
            return;
        }
        await provider.goalContract?.(target, stake, updates, deadline);
    }
    
    const uiConsole = (...args: unknown[]): void => {
        const el = document.querySelector('#console>p');
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, (key, value) => (typeof value === 'bigint' ? value.toString() : value), 2);
        }
        // if (el) {
        //     const value = args?.[0]?.[0]; // Extract the first value from the first array
        //     el.innerHTML = value ? value.toString() : ''; // Update the inner HTML with the extracted value
        // }
    };

    const contextProvider = {
        web3Auth,
        chain,
        provider,
        user,
        isLoading,
        account,
        login,
        logout,
        getAccounts,
        randomContractInteraction,
        goalContract,
    };
    
    return <Web3AuthContext.Provider value={contextProvider}>{children}</Web3AuthContext.Provider>;

};