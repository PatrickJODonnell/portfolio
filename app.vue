<script setup lang="ts">
  // Imports
  import { ref } from 'vue';

  // Ref Values
  const formData = ref({
    name: '',
    email: '',
    message: ''
  });
  const submitted = ref<boolean>(false);
  const returnMessage = ref<string>('Thanks for the message!');
  const isModalOpen = ref<boolean>(false);
  const num1 = ref<number>(Math.floor(Math.random() * 10));
  const num2 = ref<number>(Math.floor(Math.random() * 10));
  const captchaAnswer = ref<string>('');

  // Handling Nav Button
  const navToAbout = (): void => {
    const about: HTMLElement | null = document.getElementById('about');
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handing footer Nav button
  const navToHome = (): void => {
    const home: HTMLElement | null = document.getElementById('home');
    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Handling Form Submission
  const handleSubmit = async (): Promise<void> => {
    if (!formData.value.name) {
      if (returnMessage.value === 'Thanks for the message!') {
        returnMessage.value = '';
      }
      returnMessage.value = returnMessage.value + 'Name is required. \n';
    } if (!formData.value.email || !formData.value.email.includes('@')) {
      if (returnMessage.value === 'Thanks for the message!') {
        returnMessage.value = '';
      }
      returnMessage.value = returnMessage.value + 'Valid email is required. \n';
    } if (!formData.value.message) {
      if (returnMessage.value === 'Thanks for the message!') {
        returnMessage.value = '';
      }
      returnMessage.value = returnMessage.value + 'Message is required. \n';
    }
    if (returnMessage.value === 'Thanks for the message!') {
      // Sending the use to the modal to finish the submission process
      isModalOpen.value = true;
    }
    // Displaying error message if there is one!
    console.log(returnMessage.value);
    submitted.value = true;
    timeoutMessage();
  }

  // Closing Modal and populating captcha answer
  const sendMessage = async (): Promise<void> => {
    // Setting ref values
    isModalOpen.value = false;
    captchaAnswer.value = (document.getElementById('captchaInput') as HTMLInputElement).value;

    // Resetting Input field value
    (document.getElementById('captchaInput') as HTMLInputElement).value = '';

    // Checking if the captcha answer is correct
    if (Number(captchaAnswer.value) !== num1.value + num2.value) {
      //handle incorrect captcha
      submitted.value = true;
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
      num1.value = Math.floor(Math.random() * 10);
      num2.value = Math.floor(Math.random() * 10);

      // Calling to send success message
      returnMessage.value = 'Incorrect Captcha Answer. Please try again.';
      timeoutMessage()
    } else {
      //handle correct captcha answer
      const requestBody = {
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message
      }

      // Resetting some ref values
      submitted.value = true;
      formData.value = {
        name: '',
        email: '',
        message: ''
      }
      num1.value = Math.floor(Math.random() * 10);
      num2.value = Math.floor(Math.random() * 10);

      // Sending the email
      const res = await $fetch('api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Calling to send success message
      returnMessage.value = 'Thanks for the message!';
      timeoutMessage();
    }
  }

  // Rendering the return message for 2 seconds
  const timeoutMessage = (): void => {
    setTimeout(() => {
      submitted.value = false;
      returnMessage.value = 'Thanks for the message!';
    }, 2000);
  }
</script>

<template>
  <div>
    <NuxtLayout>
      <header>
        <nav class="nav">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <div class="home" id="home">
          <h1>Hello, <span class="name">I'm Patrick.</span></h1>
          <h1>I'm a Data Engineer and Web Developer.</h1>
          <button class="view-button" @click="navToAbout"> <p>View my work</p> <IconsDownArrow /> </button>
        </div>
        <div class="about" id="about">
          <h1 class="heading">About</h1>
          <div class="about-content">
            <div class="about-text">
              <img src="~/assets/images/Teamspic.png" alt="Profile Picture" class="about-profile"/>
              <p>
                A professional Data Engineer and Web Developer with a passion for creating
                data-driven applications and developing robust data pipelines. I have experience
                working with a variety of languages including Python, SQL, TypeScript, and Java and a
                multitude of technologies such as AWS services, orchestration tools, and databases. 
                I am always looking for new opportunities to learn and grow as a developer to
                further expand my skillset in the software industry.
              </p>
            </div>
            <div class="about-image">
              <div>
                <div class="tech-bubble">
                    <img src="~/assets/images/python.png" />
                    <p>Python</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/typescript.png" />
                    <p>TypeScript</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/java.png" />
                    <p>Java</p>
                </div>
              </div>
              <div>
                <div class="tech-bubble">
                    <img src="~/assets/images/nuxtjs.png" />
                    <p>Nuxt.js</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/dash.png" />
                    <p>Dash</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/react.png" />
                    <p>React.js</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/node.png" />
                    <p>Node.js</p>
                </div>
              </div>
              <div>
                <div class="tech-bubble">
                    <img src="~/assets/images/aws.png" />
                    <p>AWS</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/prefect.png" />
                    <p>Prefect</p>
                </div>
                <div class="tech-bubble">
                    <img src="~/assets/images/snowflake.png" />
                    <p>Snowflake</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="projects" id="projects">
          <h1 class="heading">Projects</h1>
          <div class="project-left">
            <div class="project-left-image">
              <img src="~/assets/images/WageCheck.png" alt="Stock Market" />
            </div>
            <div class="project-left-text">
              <h1>WageCheck</h1>
              <h2>Web Application</h2>
              <br />
              <p>
                Full stack salary verification software built using MongoDB, Express.js, React.js, Node.js, and the OpenAI API.
              </p>
              <br />
              <a href="https://github.com/PatrickJODonnell/WageCheck">Learn More</a>
            </div>
          </div>
          <div class="project-right">
            <div class="project-right-text">
              <h1>SpaceX Pipeline</h1>
              <h2>Data Pipeline</h2>
              <br />
              <p>
                Fully automated and orchestrated data pipeline built with Python, Prefect, AWS Glue, and AWS Athena.
              </p>
              <br />
              <a href="https://github.com/PatrickJODonnell/SpaceXPipeline">Learn More</a>
            </div>
            <div class="project-right-image">
              <img src="~/assets/images/spacex.png" alt="Stock Market" />
            </div>
          </div>
          <div class="project-left">
            <div class="project-left-image">
              <img src="~/assets/images/pnl.png" alt="Stock Market" />
            </div>
            <div class="project-left-text">
              <h1>P&L Tutors Website</h1>
              <h2>Company Landing Site</h2>
              <br />
              <p>
                Front-end landing site for a tutoring company built using HTML, CSS, and JavaScript.
              </p>
              <br />
              <a href="http://pnl-tutors.com/">View Site</a>
              <br />
              <a href="https://github.com/PatrickJODonnell/PnLTutors">Learn More</a>
            </div>
          </div>
          <div class="project-right">
            <div class="project-right-text">
              <h1>Remote Tool Crib</h1>
              <h2>Automated Tool Storage Solution</h2>
              <br />
              <p>
                Physical tool storage device that includes RFID tracking, electromagnetic locks, integrated touch screen, and a fail safe database all tied together using a Python based software.
              </p>
              <br />
              <a href="https://youtu.be/XmzBWZpeXWw">View Demo</a>
              <br />
              <a href="https://github.com/PatrickJODonnell/RemoteToolCrib">Learn More</a>
            </div>
            <div class="project-right-image">
              <img src="~/assets/images/rtc.png" alt="Stock Market" />
            </div>
          </div>
        </div>
        <div class="contact" id="contact">
          <h1 class="heading">Contact</h1>
          <form @submit.prevent="handleSubmit" class="contact-form">
            <p>Have a question or want to work together? Send me a message! I'll get back to you as soon as possible.</p>
            <br />
            <!-- Name Input -->
            <input type="text" id="name" name="name" v-model="formData.name" placeholder="Name" />
            <!-- Email Input -->
            <input type="email" id="email" name="email" v-model="formData.email" placeholder="Email"/>
            <!-- Message Input -->
            <textarea id="message" name="message" v-model="formData.message" placeholder="Message"></textarea>
            <div class="btn-container">
              <!-- Submit Button -->
              <button type="submit" class="form-btn">Submit</button>
            </div>
          </form>
          <!-- Display return message from form -->
          <div v-if="submitted" class="success-message">
            <p>{{ returnMessage }}</p>
          </div>
        </div>
      </div>
      <div class="top-btn-container">
        <button class="to-top-btn" @click="navToHome">
          <IconsUpArrow />
        </button>
      </div>
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal">
          <h2>Please verify that you're not a robot! </h2>
          <br/>
          <h3> What is {{ num1 }} + {{ num2 }}?</h3>
          <input type="text" id="captchaInput" />
          <button @click="sendMessage" class="submit-captcha-button">Submit</button>
        </div>
      </div>
      <footer>
        <div class="footer-images">
          <a href="https://github.com/PatrickJODonnell">
            <img src="~/assets/images/github.png" />
          </a>
          <a href="https://www.linkedin.com/in/pjod/">
            <img src="~/assets/images/linkedin.png" />
          </a>
        </div>
        <p>Patrick O'Donnell ©2024 </p>
      </footer>
    </NuxtLayout>
  </div>
</template>
