import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useCustomerOrders from '../hooks/useCustomerOrders';
import { useTailwind } from 'tailwind-rn/dist';
import { useNavigation } from '@react-navigation/native';
import { CustomersScreenNavigationProps } from '../screens/CustomersScreen';
import { Card, Icon } from '@rneui/themed';

type props = {
    userId: string;
    name: string;
    email: string;
}

const CustomerCard = ({userId, name, email}:props) => {
    const {loading, error, orders} = useCustomerOrders(userId);
    const tw = useTailwind();
    const navigation = useNavigation<CustomersScreenNavigationProps>()

  return (
   <TouchableOpacity onPress={()=>navigation.navigate('MyModal',{ name: name, userId: userId})}>
    <Card containerStyle={tw("p-5 rounded-lg")}>
        <View>
            <View style={tw("flex-row justify-between")}>
            <View>
                <Text style={tw("text-2xl font-bold")}>{name}</Text>
                <Text style={[tw("text-sm"), { color: '#59c1cc'}]}>ID: {userId}</Text>
            </View>
            <View style={tw("flex-row items-center justify-end")}>
                <Text style={{color:'#59c1cc'}}>{loading ? "loading..." : `${orders.length} x`}</Text>
                <Icon 
                    style={tw("mb-5 ml-auto")}
                    name={'box'}
                    type={'entypo'}
                    size={50}
                    color={'#59c1cc'}
                />
            </View>
            </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
    </Card>
   </TouchableOpacity>
  )
}

export default CustomerCard