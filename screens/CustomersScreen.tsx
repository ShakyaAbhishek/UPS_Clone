import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {useTailwind} from 'tailwind-rn';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabStackParamList } from '../navigator/TabNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import { Image, Input } from '@rneui/themed';
import { GET_CUSTOMERS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import CustomerCard from '../components/CustomerCard';

export type CustomersScreenNavigationProps = CompositeNavigationProp<
BottomTabNavigationProp<TabStackParamList, 'Customers'>,
NativeStackNavigationProp<RootStackParamList>
>

const CustomersScreen = () => {
    const tw = useTailwind();
    const navigation = useNavigation<CustomersScreenNavigationProps>();
    const [input, setInput] = useState<string>('');
    const {loading, error, data} = useQuery(GET_CUSTOMERS);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false,
        })
    },[])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#59c1cc'}}>
      <Image 
        source={{ uri: 'https://links.papareact.com/3jc' }} 
        containerStyle={tw("w-full h-64")}
        PlaceholderContent={<ActivityIndicator />}
        />

        <Input 
            placeholder="Search By Customer"
            value={input}
            onChangeText={setInput}
            containerStyle={tw('bg-white pt-5 pb-0 px-10')}
        />

        {data?.getCustomers?.filter((customers: CustomerList) => customers.value.name.includes(input)).map(({name: ID, value: { email, name}}: CustomerResponse)=>(
            <CustomerCard key={ID} name={name} email={email} userId={ID} />
        ))}
    </ScrollView>
  )
}

export default CustomersScreen