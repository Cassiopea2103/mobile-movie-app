import {Image, ImageBackground, Text, View, ImageSourcePropType} from "react-native";
import {images} from "@/constants/images";

type TabIconProps = {
    focused: boolean,
    icon: ImageSourcePropType,
    title: string
}
const TabIcon = (tabProps: TabIconProps) => {
    return (
        tabProps.focused ?
            <ImageBackground
                source={images.highlight}
                className="flex flex-row flex-1 w-full min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden gap-2"
            >
                <Image
                    source={tabProps.icon}
                    tintColor='#151312'
                    className={'size-5'}
                />
                <Text
                    className={'text-secondary text-base font-semibold'}
                >
                    {tabProps.title}
                </Text>
            </ImageBackground>
            :
            <View className={'size-full justify-center items-center rounded-full mt-4'}>
                <Image
                    source={tabProps.icon}
                    tintColor={'#A8B5DB'}
                />
            </View>
    )
}

export default TabIcon;