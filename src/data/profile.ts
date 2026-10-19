// Update the headline and introduction when new role details are ready to publish.
export const profile = {
  headline: 'Software Engineer',
  introduction: "I'm Shane, a software engineer based in Texas. I've worked across financial services, enterprise software, media, machine learning platforms, restaurant technology, and service operations.",
  approach: "My work spans full-stack development, platform architecture, and release engineering. I care about understandable interfaces, reliable delivery, and giving people the tools to do their best work.",
};

export const experience = [
  {
    company: 'Cirrus Solutions, Inc.',
    roles: [{
      title: 'Senior Developer', dates: 'October 2025 - September 2026',
      highlights: [
        'Built a custom CI/CD solution with GitHub Actions and Octopus Deploy, saving approximately 1.5 hours per developer per day on test deployments.',
        'Designed and built a greenfield .NET Core application using Copilot agents to streamline work-order coordination and communication.',
        'Coordinated infrastructure upgrades to remove deployment downtime.',
      ],
    }],
    project: { label: 'Subcontractor Portal: sole developer', anchor: 'subcontractor-portal' },
  },
  {
    company: 'Olo',
    roles: [
      {
        title: 'Senior Release Engineer I', dates: 'May 2022 - September 2025',
        highlights: [
          'Increased internal CI/CD platform availability from below 80% to 99.9% by stabilizing and scaling self-hosted infrastructure and enablement tools.',
          'Standardized Kubernetes-based CI/CD workflows using TeamCity, Octopus Deploy, Helm, and AWS ECR, reducing pipeline creation time by 75%.',
          'Used GitHub Copilot to extend and test custom CI enablement tools, reducing implementation time by 50% and improving reliability from approximately 50% to 99.5%.',
          'Helped increase monolithic ordering-platform deployments from two per week to more than twelve per week.',
        ],
      },
      {
        title: 'Senior Software Engineer I', dates: 'December 2020 - May 2022',
        highlights: [
          'Built reporting functionality in the Olo Dashboard using React and C# Web APIs.',
          'Used Raygun and Mixpanel activity data to inform product decisions, and established baseline SLOs and SLAs in Datadog.',
          'Collaborated with stakeholders and customers on interface improvements that reduced confusion around system-generated reports.',
        ],
      },
    ],
  },
  {
    company: 'Quickpath',
    roles: [{
      title: 'Platform Architect', dates: 'August 2019 - December 2020',
      highlights: [
        'Led Git Flow adoption with Jira, DockerHub, and Travis CI integration; rebuilt pipelines and introduced native Kubernetes functionality for deployment behind customer firewalls.',
        'Integrated HashiCorp Vault for secrets management and Keycloak for enterprise single sign-on.',
        'Modernized an AngularJS interface with Vue.js and designed and documented a RESTful API with Swagger.',
        'Developed GitLab CI pipelines for a custom Python application running on Red Hat servers at USAA.',
      ],
    }],
  },
  {
    company: 'iHeartMedia',
    roles: [{
      title: 'Senior Software Engineer', dates: 'December 2017 - August 2019',
      highlights: [
        'Led engineering teams through design and delivery, and mentored developers through reviews, pairing, and training in Angular and Java / Spring Boot.',
        'Worked with stakeholders and business analysts to clarify priorities.',
        'Co-authored a Jenkins pipeline rewrite to support faster delivery and strategically timed production releases.',
      ],
    }],
  },
  {
    company: 'Experis',
    roles: [{ title: 'Senior Software Engineer at iHeartMedia', dates: 'November 2017 - December 2017', highlights: [] }],
  },
  {
    company: 'AgileCraft',
    roles: [{
      title: 'Senior Full-Stack Engineer', dates: 'March 2016 - November 2017',
      highlights: [
        'Developed platform capabilities with D3.js, AngularJS, and C# RESTful APIs.',
        'Integrated automated unit, integration, and end-to-end testing using Mocha, Chai, Karma, Nightwatch, and Selenium.',
        'Prototyped Vue, React, and Angular to guide a user-experience and interface overhaul.',
      ],
    }],
  },
  {
    company: 'USAA',
    roles: [
      {
        title: 'Software Developer & Integrator II', dates: 'July 2015 - March 2016',
        highlights: [
          'Built responsive AngularJS and Bootstrap applications backed by Java RESTful services, RESTEasy, Maven, and JUnit.',
          'Received an Accessibility Awareness award for an application following ARIA / ADA standards.',
          'Collaborated on an internal hybrid-mobile application using Ionic, Angular, Mocha, and Chai.',
        ],
      },
      {
        title: 'Software Developer & Integrator III', dates: 'August 2013 - July 2015',
        highlights: [
          'Researched data visualization approaches for business intelligence and partnered across organizations to understand needs and share ideas.',
        ],
      },
      {
        title: 'Software Development Intern', dates: 'May 2013 - August 2013',
        highlights: [
          'Contributed to employee analytics and data-warehouse development on a Scrum team, and volunteered on enterprise innovation projects.',
        ],
      },
    ],
    project: { label: 'Hierarchical data display: named inventor', anchor: 'hierarchical-data-display' },
  },
];

export const earlierExperience = [
  { company: 'Limitless Landscaping', title: 'Webmaster', dates: 'January 2012 - January 2015', summary: 'Designed and maintained the company website and blog, with cross-browser compatibility.' },
  { company: 'Texas Tech University High-Performance Computing Center', title: 'Student Assistant', dates: 'May 2013 - August 2013', summary: 'Redesigned the Center for Autonomic and Cloud Computing website, developed presentations, and supported cluster maintenance.' },
  { company: 'Texas Tech University', title: 'Web Developer', dates: 'August 2011 - May 2013', summary: 'Improved compatibility, structure, and design consistency across College of Engineering websites.' },
  { company: 'Self-Employed', title: 'Web Developer', dates: 'June 2010 - May 2013', summary: 'Designed WordPress websites with clients and helped them learn to maintain their sites.' },
  { company: 'Data-Intensive Scalable Computing Laboratory (DISCL)', title: 'Undergraduate Research Assistant', dates: 'May 2012 - January 2013', summary: 'Researched GPU approaches to big-data problems, presented research, and reviewed proposals.' },
  { company: 'Geek Squad', title: 'Computer Sales Associate / Agent on Deck / Counter Intelligence Agent / Covert Agent', dates: 'May 2008 - August 2011', summary: 'Diagnosed and repaired computers, taught Apple computer classes, and earned Most Valuable Employee twice.' },
  { company: 'Walmart', title: 'Electronics Associate', dates: 'February 2007 - May 2008', summary: 'Worked in electronics retail and customer service.' },
  { company: 'Big Spring Independent School District', title: 'Substitute Teacher', dates: 'October 2006 - May 2007', summary: 'Led classroom activities and worked with students from a variety of backgrounds.' },
];

export const education = [
  { school: 'Texas Tech University', study: 'Bachelor of Science, Computer Science', dates: '2009 - 2013' },
  { school: 'University of Texas at Permian Basin', study: 'Studies in Kinesiology and Exercise Science & Computer Science', dates: '2005 - 2008' },
  { school: 'Howard College', study: 'General Studies', dates: '2004 - 2005' },
  { school: 'Western Texas College', study: 'General Studies', dates: '2002 - 2004' },
];
