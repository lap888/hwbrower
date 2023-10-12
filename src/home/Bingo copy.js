import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useToast, Toast, Button } from "native-base"
import Colors from '../theme/Colors';
import Header from '../components/Header';
import config from '../../config/config';
// import crypto from 'crypto';
import aelf from '../../utils/initAElf';
import AElf from 'aelf-sdk';
import styles from './home.style';
export default class Bingo extends Component {
    constructor(props) {
        super(props);
        const wallet = AElf.wallet.createNewWallet();
        config.gameWallet = wallet;

        this.wallet = wallet;
        this.state = {
            bingoGameContract: null,
            disabled: false,
            loading: false
        };
    }
    // sha256 = (str) => {
    //     let hash = crypto.createHash('sha256')
    //     return hash.update(str).digest('hex');
    // }
    componentDidMount() {
        const {
            sha256
        } = AElf.utils;
        
        aelf.chain.getChainStatus()
            // get instance by GenesisContractAddress
            .then(res => {
                console.warn('res=', res)
                return aelf.chain.contractAt(res.GenesisContractAddress, this.wallet)
            })
            // return contract's address which you query by contract's name
            .then(zeroC => {
                console.warn('zeroC=', zeroC)
                let ss = sha256('AElf.Boilerplate.BingoGameContract');
                return zeroC.GetContractAddressByName.call(ss)
            })
            // return contract's instance and you can call the methods on this instance
            .then(bingoAddress => {
                console.warn('bingoAddress=', bingoAddress)
                return aelf.chain.contractAt(bingoAddress, this.wallet)
            })
            .then(bingoGameContract => {
                this.setState({
                    bingoGameContract,
                    disabled: false
                });
            })
            .catch(err => {
                Toast.show({
                    title: "get contract failed",
                    placement: "bottom",
                });
                console.error(err);
            });
    }

    onClick() {
        const { bingoGameContract } = this.state;
        Toast.show({ description: 'ok', placement: 'bottom' })
        this.setState({
            loading: true
        });
        bingoGameContract.Register().then(() => {
            Toast.success('恭喜你注册成功，祝你游戏愉快！！！', 3, () => {
                this.setState({ loading: false });
                // Actions.PalyGame();
            });
        }).catch(err => {
            console.error(err);
            Toast.fail('registration failed');
        });
    }
    render() {
        let { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <StatusBar backgroundColor={Colors.main} />
                <Header navigation={navigation} isTabBar={true} title="Home" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Text style={styles.title}>Welcome to Bingo</Text>
                    </View>
                    <Button
                        isDisabled={this.state.disabled}
                        isLoading={this.state.loading}
                        onPress={() => this.onClick()}
                    >
                        Register
                    </Button>
                </View>

            </View>
        );
    }
}
