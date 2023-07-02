import React from 'react'
import { Button } from "reactstrap"
import Image from 'next/image'
const Hero = () => {
    return (
        <div className='hero container' >
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div>
                        <h1>
                            Landing Page
                            <br />
                            UI Kit
                        </h1>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus facere corporis voluptatibus explicabo quod ipsum dolorum sunt? Dolorem, suscipit quod.
                        </p>
                        <Button color='primary' className='px-4' > Get Started</Button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="bg-circle mx-auto">
                        <Image src="/lawyer.jpg" width={500} height={500} className='hero_img' alt='' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero