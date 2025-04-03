# Chris Meah Personal Website - The AI Doctor

## Project Overview

A 3D website built with **React Three Fiber (r3f)** for **Chris Meah** at [chrismeah.com](http://chrismeah.com).

### **Current Tech Stack:**

- **Vite.js**
- **React Three Fiber (r3f)**
- **Trellis**
- **3js.editor**
- **ace-eternity**

## Inspiration

This project brings the idea of Chris as the 'AI Doctor' to life—imagine Doctor Strange, but instead of bending reality, he's shaping the future of AI. We were actually debating if we should draw inspiration from a medical doctor or dr strange, we went with dr strange for this. 

## How it began

We stumbled upon the [Ethereum Foundation](https://ethereum.foundation/) website and thought it was _super cool_. This led us down a rabbit hole of exploring other 3D websites, and after checking the source code in Chrome DevTools, we saw they were using **Three.js**.

Some of the coolest websites we came across:

1. ([Junni](https://next.junni.co.jp/))
2. [Joshuas World](https://www.joshuas.world/)
3. [Lusion](https://lusion.co/)

But the one that really stood out—and became the main inspiration for our project—was[They Call Me Giulio](https://www.theycallmegiulio.com/).

After discovering Giulio’s site, we had v0 try to recreate something similar because, at the time, we had no clue how to work with Three.js. The first attempt... well, it was _interesting_. 😅
![v0](/public/v0.png)

## Actual Implementation

Once we started experimenting with Three.js, we ended up creating some **3D Chris head cubes** 😂 (check out our [Figma Board](https://www.figma.com/board/mFvEvcsT1cp0253TmjVDhg/Untitled?node-id=7-154&t=PDPHYRzHhghXMML8-0)).

[chris-r3f-practice.vercel.app](https://chris-r3f-practice.vercel.app)

**Finding a Better Approach** – As we got more comfortable with **React Three Fiber**, the idea of creating a Doctor Strange-inspired robot from scratch seemed a bit too much. So we thought, "Let's find a quicker way to make this happen."

To make the concept work, we realised it was nearly impossible to pull off just by tweaking the actual code (at least to a good standard). So, we decided to look into quicker and easier solutions to get a very basic first working version.

Being complete newbies to 3D modelling, here’s the plan we came up with:

1. **Use an existing robot design** – We took inspiration from Giulio’s robot, grabbed a screenshot (below), and asked **ChatGPT** to generate the rest of the body and add a Doctor Strange-style cape.

   **Result:** [![ai-doctor](/public/ai-doctor.png)]

2. **Convert 2D to 3D** – Using **Trellis**, we turned the concept into a 3D model and extracted the `.glb` file.

   **Screenshot:**

3. **Refine the Model** – Uploaded the `.glb` file to the **Three.js editor**, added lighting, made some tweaks, and exported the final `.gltf` file for our repo.

4. **Final Prototype** – After uploading the model, playing around with it, and making sure it worked, we deployed the first working version!

## First Prototype Thoughts

The first working version is definitely not perfect. This is most likely as we were also pretty busy with Eid, Vonage Hackathon, preparing for interviews, 15 applications a week as per Vicky's advice and other things. That said, it's definetly not an excuse and we're excited about what’s next, having seem what we could achieve in the space of a few hours scattered over a week!

Here’s what we would like do in the future:

- **Blender Integration**: We want to improve the model by adding a more **metallic, tech-inspired aesthetic** for the custom 3D models.
- **Advanced Animations**: Using **Blender** and the **Animation Mixer**, we want to bring in more human-like movement for the 3D model.
- **Chris' journey**: The model should take the user on an interactive journey through Chris' achievements.
- **Customized 3D Avatar**:We love the Dr. AI and Dr. Strange inspirations! If you're open to it we would like to set up a **consultation with you** to discuss the best avatar to represent you— we're just getting started with the 3D concept!
- **AI Chatbot Agent**: We’re adding a chatbot agent that can handle things like bookings.
- **Improved UI**: A more sophisticated and futuristic technological aesthetic for the site.
- **More Diverse Colours**: Right now, the colour scheme is mostly **blues**, but we’re planning to introduce a wider range of colours.
- **Thoroughly tested**: Our solution will be rigorously evaluated across diverse scenarios to ensure reliability and performance in real-world applications.

### **Further 3D Inspiration:**

- **https://www.awwwards.com/websites/three-js/**

## Acknowledgements

- **React Three Fiber Basics:** [YouTube Tutorial 1](#)
- **Three.js tutorial: Editor for beginners:** [YouTube Tutorial 2](#)

## Installation and Setup

```bash
# Clone the repository
git clone git@github.com:codesungrape/r3f-basics.git

# Navigate to the project directory
cd r3f-basics

# Install dependencies
npm install

# Start the development server
npm run dev
```
