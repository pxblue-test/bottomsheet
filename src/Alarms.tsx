import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import * as Colors from '@pxblue/colors'
import { Icon, ListItem } from 'react-native-elements';
import { Header, InfoListItem, wrapIcon } from '@pxblue/react-native-components';

const MenuIcon = wrapIcon({ IconClass: Icon, name: 'menu' });
const MoreIcon = wrapIcon({ IconClass: Icon, name: 'more-vert' });
const NotificatonsIcon = wrapIcon({ IconClass: Icon, name: 'notifications' });
const NotificatonsActiveIcon = wrapIcon({ IconClass: Icon, name: 'notifications-active' });

import BottomSheet from './BottomSheet';

import alarms, { formatDate } from './alarmData';

type AlarmsState = {
    showBottomSheet: boolean;
}

class Alarms extends React.Component<{}, AlarmsState> {
    constructor(props: object) {
        super(props);
        this.state = {
            showBottomSheet: false,
        };
    }

    render() {
        return (
            <>
                <Header
                    navigation={{ icon: MenuIcon, onPress: () => { } }}
                    title={'Bottom Sheet'}
                    actionItems={[
                        { icon: MoreIcon, onPress: () => { this.setState({ showBottomSheet: true }) } }
                    ]}
                />
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                        {
                            alarms.map((item, index) => (
                                <InfoListItem
                                    key={index}
                                    title={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                                    subtitle={formatDate(item.date)}
                                    backgroundColor={Colors.white[50]}
                                    IconClass={item.active ? NotificatonsActiveIcon : NotificatonsIcon}
                                    iconColor={item.active ? Colors.white[100] : Colors.black[500]}
                                    fontColor={item.active ? Colors.red[500] : Colors.black[500]}
                                    statusColor={item.active ? Colors.red[500] : Colors.white[100]}
                                    avatar={item.active}
                                />
                            ))
                        }
                    </ScrollView>
                </SafeAreaView>
                {this.state.showBottomSheet ? 
                        <View 
                            style={styles.overlay}
                            onTouchStart={() => this.setState({ showBottomSheet: false })}
                            testID={'overlay'}
                            >
                        </View>
                        : null
                }
                <BottomSheet style={styles.footer} show={this.state.showBottomSheet}>
                    <ListItem
                        title={'Acknowledge All'}
                        leftIcon={{ name: 'done' }}
                        onPress={() => this.setState({ showBottomSheet: false })}
                        titleStyle={styles.bottomSheetItemTitle}
                        testID={'menu-item-button-0'}
                    />
                    <ListItem
                        title={'Export'}
                        leftIcon={{ name: 'get-app' }}
                        onPress={() => this.setState({ showBottomSheet: false })}
                        titleStyle={styles.bottomSheetItemTitle}
                        testID={'menu-item-button-1'}
                    />
                    <ListItem
                        title={'Cancel'}
                        leftIcon={{ name: 'clear' }}
                        onPress={() => this.setState({ showBottomSheet: false })}
                        titleStyle={styles.bottomSheetItemTitle}
                        testID={'cancel-button'}
                    />
                </BottomSheet>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white[100],
        flex: 1,
    },
    footer: {
        margin: 0,
        backgroundColor: Colors.white[100],
        shadowColor: Colors.black[900],
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '100%', 
        maxWidth: 600,
    },
    bottomSheetItemTitle: {
        paddingLeft: 16,
    },
    overlay: {
        backgroundColor: Colors.black[900],
        opacity: 0.7,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    }
});
export default Alarms;