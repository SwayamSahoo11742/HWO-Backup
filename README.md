# Exoplaneteer

The project made for [NASA International Space Apps Challenege](https://www.spaceappschallenge.org/)

<br>

## The Team
The team is comprised of 4 High School students in the Greater Boston Metropolitan area.

Ansel Dsouza: A freshman who contributed heavily towards the backend and mathematics sectors of the space app. 

Swayam Sahoo: A sophomore who contributed all-around, in terms of UI, 3d renders, backend, mathematics, as well as coming up with the plan. 

Harshit Masalawala: A sophomore who mainly contributed towards UI and the general design of the website, as well as the presentation. 

Akhil Dantam: A senior responsible for the implementation of data and statistics in the website.

<br>

## The Challenge
We decided to pick the intruiging "Navigator for the Habitable Worlds Observatory (HWO): Mapping the Characterizable Exoplanets in our Galaxy", whose problem statement is given below, taken fromt he website:

"Which exoplanets will be observable with the future Habitable Worlds Observatory (HWO)? One way of determining the most interesting exoplanetary targets for HWO would be to visualize which of the currently known exoplanets HWO could potentially observe. Your challenge is to develop an app that enables users to visualize the observational paths across our galaxy to the known exoplanets in the solar neighborhood as a function of their potential for characterization by HWO."

<br>

## High-Level Summary
We developed Exoplaneteer, an interactive 3D visualization app that simulates the potential of the Habitable Worlds Observatory (HWO) to characterize known exoplanets. The app visualizes the exoplanet population and allows users to adjust telescope and instrument parameters, such as aperture and sensor size, to see how these changes affect the number of detectable exoplanets. By offering real-time updates on the observability of exoplanets, Exoplaneteer helps NASA stakeholders explore HWO's performance, providing valuable insights into which exoplanets are most promising for further study and how to optimize the observatory’s capabilities. This tool supports informed decision-making in the ongoing search for habitable worlds.

<br>

## Project Demo and Product

YT Demo: https://youtu.be/PPG6z5W9HdM

Product: https://soft-alpaca-79d6db.netlify.app/

[Presentation Slides](https://docs.google.com/presentation/d/1avIclaVSfTI4TE4RzfGRPuq_Dya2-TQ8VwoZFSr3lq0/edit#slide=id.g308af018deb_0_1433)

<br>

## Project Details

### Overview

The Exoplaneteer project provides a 3D visualization designed to simulate and analyze the performance and capabilities of the Habitable Worlds Observatory (HWO) in characterizing known exoplanets. The app allows users to view exoplanets mapped in 3D space, look at details about them and their host stars, and adjust telescope parameters in order see how these changes impact the number of observable and characterizable exoplanets. Furthermore, it provides analytics to determine promising habitable exoplanet candidates, such as habitability scores, habitability zones, and others.



### Process

The app processes exoplanet data from the NASA Exoplanet Archive, which is used to map them in 3D space. Their positions are determined by galactic coordinates. We then use a cone to represent the line of sight of the HWO, which can be adjusted by tweaking the focal length and sensor size. The user is also able to adjust the aperture size, which affects the characterizability of exoplanets, which is updated in real time. The app uses signal-to-noise ratio (SNR) and distance from earth to calculate if an exoplanet is characterizable. 

![image](https://github.com/user-attachments/assets/4d9fff91-fc36-4524-b7de-d54373bae96f)

### Analytics

The app provides many analytics to access the capabilities of the exoplanet. The app shows how useful a set of telescope parameters and orientations will be by showing the following data:



Total exoplanets in field of view
Total characterizable exoplanets
Earth Similarity Index (ESI) graph
Distance from habitable zone
![image](https://github.com/user-attachments/assets/cbc73835-0cab-4297-9774-0f9854c582bd)


By looking at the graphs and values of the above, we can access how useful this mission will be, and its potential to find something valuable

### Exoplanet Specifics and Filtering

Users can search for specific exoplanets, or filter by specific parameters, such as ESI, host star, distance from habitable zone, characterizability. This feature will also color code the planets in the 3D visual, allowing for a visual representation of the distribution of exoplanetary parameters around us.



![image](https://github.com/user-attachments/assets/16d8206e-686d-4abf-9622-9e0983f8ddf6)


Allowing users to look for and sort by different properties allows for a broader understanding of exoplanets in relation to each other, and the effect they have on the HWO.

![image](https://github.com/user-attachments/assets/fafdc48e-f85a-4661-b60e-8299f4cd96db)

A neat, color coded visual allows the user to see such relations and benefits on the go.


We allow users to look into specific exoplanet systems in relation to their host stars and habitable zone. They can find many more specifics about the exoplanet and its star, such as the discoverer, mass, radius, ESI, stellar class, and much more.



![image](https://github.com/user-attachments/assets/0c72fa37-b9ec-4094-898e-f0a06279d377)


### Tools and Technology

We utilized the following tools and technologies to help us create Exoplaneteer 

- Languages; JavaScript, HTML, Python, and CSS

- Frameworks and Libraries: ReactJS, Three.js, React Three Fiber, D3.js, TailwindCSS, Chart.js

- Data: NASA Exoplanet Archive

### Benefits

This app provides a visualization that can teach users about exoplanets, the HWO telescope and its configurations and impact on exoplanets
The app can help explore habitability and see distributions of exoplanets based on certain parameters
It can give stakeholders insight on the usefulness and the impact of the HWO, and how changes to its different aspects may change the capability and potential of the HWO.


### The Goal

The goal of the Exoplaneteer is to help NASA stakeholders understand and optimize the observational capabilities of the HWO. By allowing users to interact with the telescope parameters and see their effects on the exoplanets detected, the app aims to allow for strategic decisions about instrument parameters, and accessing the usefulness of the HWO, contributing to the search for habitable worlds.

<br>

## The Future

![image](https://github.com/user-attachments/assets/d98653d0-2fa4-4f70-b92c-f6b013a714a7)

We plan on furthur developing this website into somehting robust and useful, instead of it being a simple one-off project for the hackathon. We have the following planned for the future in order of importance:

- Coronagraph Implementation
  - A coronagraph will allow the telescope to see many more exoplanets than without, for this reason, it is very important to have this considered in the calculations for the most accurate results
- Cost Calculations
  - The HWO is still in development, so estimating its cost based on its parameters will prove to be useful and impactful in understanding the project's magnitude in terms of resources
- Image Generator
  - We may not be able tosee teh images from the HWO for years, so we might as well have fun predicting them in a smart way
- Time-Specific Data:
  - Currently, the calculatisn are done for the lifetime of the telescope and under optimal conditions, not considering the blockading of stars and exoplanets by each other. This is important to tackle in order to get accurate data for a timefram
- Life Simulations:
  - Simulating life on different exoplanets will give us more idea on the usefullness of the HWO
- Real-Time Updates:
  - The only reason this si last is because the launch of HWO is still far, but as soon as it is launched, this will be the highest priority.

<br>

## Refereces
- [Habitable Zone Calculation](https://www.planetarybiology.com/calculating_habitable_zone.html)
- [FOV Calculations](https://sdk-forum.dji.net/hc/en-us/articles/11317874071065-How-to-calculate-the-FoV-of-the-camera-lens)
- [ESI Calculations](https://phl.upr.edu/projects/earth-similarity-index-esi)
- [ESI Calculations](https://astrobiology.nasa.gov/quick-facts/earth-similarity-index/)
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)

<br>

## Contact

Contact me at swayamsa01@gmail.com for any questions or query



