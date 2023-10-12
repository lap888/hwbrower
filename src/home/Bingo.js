import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useToast, Toast, Button } from "native-base"
import Colors from '../theme/Colors';
import Header from '../components/Header';

import config from '../../config/config';
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
                return zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token'))
            })
            // return contract's instance and you can call the methods on this instance
            .then(bingoAddress => {
                console.warn('bingoAddress=', bingoAddress)
                return aelf.chain.contractAt(bingoAddress, this.wallet)
            })
            .then(bingoGameContract => {
                console.warn('bingoGameContract=', bingoGameContract)
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

    onClick(navigation) {
        const { bingoGameContract } = this.state;
        Toast.show({ description: 'ok', placement: 'bottom', duration: 3 })
        this.setState({
            loading: true
        });
        bingoGameContract.RegisterCrossChainTokenContractAddress().then(() => {
            Toast.show({ description: '恭喜你注册成功，祝你游戏愉快', placement: 'bottom', duration: 3 })
            setTimeout(() => {
                this.setState({ loading: false });
                navigation.navigate('PalyGameTab')
            }, 1000);

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
                        onPress={() => this.onClick(navigation)}
                    >
                        Register
                    </Button>
                </View>

            </View>
        );
    }
}
