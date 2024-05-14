import React from 'react';
import Layout from './../components/Layout/Layout';

const About = () => {
  return (
    <Layout title={'About us - Ecommer app'}>
      <div className='row contactus '>
        <div className='col-md-6 '>
          <img
            src='/images/about.jpeg'
            alt='contactus'
            style={{ width: '100%' }}
          />
        </div>
        <div className='col-md-4'>
          <p className='text-justify mt-2'>
            <h1 className='text-center'>Daily Greens</h1>
            <p className='text-justify mt-2'>
              Welcome to Daily Greens, your ultimate destination for nourishing
              products that fuel your body and soul. At Daily Greens, we're
              passionate about health, sustainability, and making a positive
              impact on the world around us.
            </p>
            <p className='text-justify mt-2'>
              Our journey began with a simple mission: to provide easy access to
              fresh, organic, and nutrient-rich greens for everyone. Whether
              you're a wellness enthusiast, a busy professional, or a
              health-conscious family, we believe that incorporating greens into
              your daily routine should be simple, convenient, and delicious.
            </p>
            <p className='text-justify mt-2'>
              We source the finest organic ingredients from local farmers and
              growers who share our commitment to sustainable agriculture and
              environmental stewardship. From vibrant kale and spinach to crisp
              lettuce and hearty collard greens, our produce is carefully
              selected to ensure optimal freshness and flavor.
            </p>
            <p className='text-justify mt-2'>
              But Daily Greens is more than just a marketplace for healthy
              produce. We're a community dedicated to promoting holistic
              well-being and empowering individuals to live their best lives.
              That's why we offer a wide range of products and resources to
              support your wellness journey, including cold-pressed juices,
              nutrient-packed smoothies, wholesome snacks, and expert advice on
              nutrition and healthy living.
            </p>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
