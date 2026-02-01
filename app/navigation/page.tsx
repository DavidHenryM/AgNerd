"use client"

import Head from 'next/head'
import dynamic from 'next/dynamic'
import Content from '../components/Content'
import { Ion } from 'cesium';

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || '';

const NavigationScreen = dynamic(
  () => import('../components/screens/Navigation'),
  { ssr: false }
)


export default function Navigation(){
  return (
    <Content>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <NavigationScreen/>
    </Content>
  )
}