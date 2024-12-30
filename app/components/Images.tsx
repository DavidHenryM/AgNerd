import Image from 'next/image'
import nerdCowboy from "../assets/nerd_cowboy.png"

export function NerdCowboy(props: {size: number}) {
  return (
    <Image 
      src={nerdCowboy}
      alt='AgNerd'
      width={props.size}
      height={props.size}
    ></Image>
  )
}