import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';

import { TIPS_INFO } from './data/TipsInfo';

export const Tips = ({key}: {key: string}) => {
    const tip = TIPS_INFO[key];
    let color = 'white';

    if (tip.site === 'Dewey') {
    color = 'green';
    }
    else if (tip.site === 'Kingsley') {
    color = 'blue';
    }
    else if (tip.site === 'Lincoln') {
        color = "pink";
    }
    else if (tip.site === 'Lincolnwood') {
        color = "yellow";
    }
    else if (tip.site === 'Walker') {
        color = "red";
    }
    else if (tip.site === 'Washington') {
        color = 'orange';
    }
    else if (tip.site === 'Willard') {
        color = 'purple';
    }

    return (
     <ScreenWrapper>
        <Text style={style.title}> Tips! </Text>
        <View style={ style.standoutText } backgroundColor={ color } > 
            <Text style={style.text}>{ tip.content } </Text>
        </View>
     </ScreenWrapper>

    );
};

const style = StyleSheet.create({
    standoutText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },

    text: {
        fontSize: 18,
        color: "white",
    },

    title: {
        fontSize: 28,
        color: "#34B3C2",
    },
})
