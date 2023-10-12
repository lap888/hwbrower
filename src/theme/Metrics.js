/*
 * @Author: top.brids 
 * @Date: 2019-12-20 09:37:22 
 * @Last Modified by: top.brids
 * @Last Modified time: 2021-12-11 23:23:23
 */
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');


/**
 * px和rn长度单位转化
 * @param {*} uiElementPx
 */
function px2dp(uiElementPx, uiWidthPx = 750) {
	const length = uiElementPx * width / uiWidthPx;
	return Math.ceil(length);
}

module.exports = {
	screenWidth: width,
	screenHeight: height,
	uiWidthPx: 750,
	px2dp,
	mainPadding: px2dp(50),
	APPBAR_HEIGHT: Platform.OS === 'ios' ? 44 : 56,		// Header高度
	STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : 0,	// 状态栏高度
	HEADER_HEIGHT: Platform.OS === 'ios' ? 64 : Platform.OS === 'web' ? 54 : 44,
};