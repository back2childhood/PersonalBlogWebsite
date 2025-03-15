import { useRequest, useToggle } from 'ahooks';
import React, { useState } from 'react';

import Layout from '@/components/Layout';
import { staleTime } from '@/utils/constant';

import { Title } from '../titleconfig';
import AboutMe from './AboutMe';
import s from './index.scss';

const About: React.FC = () => {
  const [state, { toggle, setLeft, setRight }] = useToggle();

  // const [content, setContent] = useState("");

  const fetchData = async () => {
    const data = await fetch("./data.json")
      .then((res) => res.json());

    //     // Convert JSON into Markdown format
    //     const markdownContent = `
    // ## Welcome to My Personal Website!  
    // ### **${data.name}**  
    // 📍 ${data.location} | 📧 [${data.email}](mailto:${data.email})  

    // ### 💡 **Skills:**  
    // **Programming Languages:** ${data.skills.programming_languages.join(", ")}  
    // **Databases:** ${data.skills.databases.join(", ")}  
    // **Development Tools:** ${data.skills.development_tools.join(", ")}  
    // **Frameworks & Web Services:** ${data.skills.frameworks_web_services.join(", ")}  

    // ### 🚀 **Connect with me:**  
    // 🔗 [GitHub](${data.social_links.github})  
    // 🔗 [LinkedIn](${data.social_links.linkedin})  
    // 🔗 [Instagram](${data.social_links.instagram})  

    // ${data.status}
    //     `;

    //     setContent(markdownContent);

    return data;
  };


  const { data, loading } = useRequest(fetchData, {
    retryCount: 3,
    staleTime
  });


  const markdownContent = data ? `
## Welcome to My Personal Website!  
### **${data.name}**  
📍 ${data.location} | 📧 [${data.email}](mailto:${data.email})  

### 💡 **Skills:**  
**Programming Languages:** ${data.skills.programming_languages.join(", ")}  
**Databases:** ${data.skills.databases.join(", ")}  
**Development Tools:** ${data.skills.development_tools.join(", ")}  
**Frameworks & Web Services:** ${data.skills.frameworks_web_services.join(", ")}  

### 🚀 **Connect with me:**  
🔗 [GitHub](${data.social_links.github})  
🔗 [LinkedIn](${data.social_links.linkedin})  
🔗 [Instagram](${data.social_links.instagram})  

${data.status}
      ` : '';

  console.log(data);
  console.log(markdownContent);

  return (
    <Layout title={Title.About} loading={loading}>
      <AboutMe className={state ? '' : s.hidden} content={markdownContent} />
    </Layout>
  );
};

export default About;
