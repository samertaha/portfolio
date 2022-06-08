import React, { useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { gsap } from 'gsap';

import '../assets/styles/Contact.css';

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    gsap.from('.form-box > *', {
      duration: 2,
      opacity: 0,
      delay: 1,
      stagger: 0.2,
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_lpg7cvv',
        'template_17xn63l',
        form.current,
        'dGAkB1kU9zUWgrNwu'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div id='container'>
      <div class='form-box'>
        <form class='c-form' ref={form} onSubmit={sendEmail}>
          <fieldset>
            <label className='c-form-label' for='user-name'>
              Name
            </label>
            <input
              type='text'
              id='user-name'
              class='c-form-input'
              name='user_name'
            />
          </fieldset>

          <fieldset>
            <label className='c-form-label' for='user-email'>
              Email
            </label>
            <input
              type='email'
              id='user-email'
              class='c-form-input'
              name='user_email'
            />
          </fieldset>

          <fieldset>
            <label className='c-form-label' for='user-message'>
              Message
            </label>
            <textarea name='message' id='user-message' class='c-form-input' />
          </fieldset>

          <input type='submit' class='c-form-btn' value='Send' />
          {/* <button class="c-form-btn" type="submit">SUBMIT</button> */}
        </form>
      </div>
    </div>
  );
};
export default Contact;
