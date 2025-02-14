# Harley D. Pascua

I build valuable and scalable line-of-business B2B software platforms

[LinkedIn]([https://linkedin.com/in/leypascua) | [Github](https://github.com/leypascua) | [Web](https://leypascua.ops.ph)

Manila (Marikina City), Philippines

## Summary

Technical Product Leader with **18+ years** of experience in product development, enterprise architecture, and business process re-engineering. Skilled in spearheading data-driven product decisions, and stakeholder management to drive product improvements and operational efficiency. Experienced in implementing fraud risk mitigation strategies to enhance security and performance.

## Professional Experience

### **Netzwelt, Inc.**

**VP Software Engineering & Service Delivery (Full-time)**
*August 2014 to Present* | Makati City, Philippines

- Spearheaded product development, enterprise architecture, and support for a global rewards platform used in **68 countries** in EMEA and Asia-Pacific.
- **Enhanced fraud detection strategies** by calculating a **risk score** of reward claims based on incoming **request statistics** from customer facing web applications.
- Reduced hosting costs by **70%** for a mission-critical legacy financial and data analytics application by engineering a cloud-ready replacement that improved business process throughput by **400%.**
- Increased customer experience team productivity by **50%** by delivering **an AI-enabled ticket triage system**
- **Relevant Skills:** Product Development, Data Analytics, Fraud Prevention, C#, ASP.NET Core, Typescript, NodeJS, Docker, SQL Server, Azure Frontdoor, Azure Cognitive Services, Azure Data Lake Storage, Microsoft Power BI.

### **Webix Solutions GmbH**

**Technical Lead (Contract, remote)**\
*January 2016 to Present* | Stuttgart, Germany

- Led the engineering of a **multi-tenant content management system** integrated with a reward promotion platform that is widely used by customers in EMEA and Asia-Pacific.
- Developed a **secure API architecture** for a B2B marketplace platform, ensuring safe transactions and protecting against cyber threats.
- **Relevant Skills:** Agile Project Management, API Security, Data Analytics, SQL Server, Redis, Vagrant, Ansible, Cloud Security, Jira, GitLab, CI/CD, Azure DevOps

### **GreeNova Philippines, Inc.**

**Solutions Architect (Full-time)**\
*August 2010 to July 2014* | Makati City, Philippines

- Led development and engineering of a customer loyalty platform **handling millions of dollars** in global rewards monthly.
- Built line-of-business enterprise collaboration platforms that streamlined secure data collection and automated business processes for European recycling, Sustainable Building Certification agencies, and legal practices in Germany.
- Solved long-term web application and database performance issues that improved response times by up to 90% for multiple projects within the organization by optimizing SQL queries, reducing server roundtrips and simplifying software components.
- **Relevant Skills:** API Development, Secure Transactions, Event-Driven Architecture, Cloud Security, SQL Optimization.

### **Pointwest Technologies Corp.**

**Senior Software Engineer (Full-time)**
*July 2007 to July 2010* | Makati City, Philippines

- Led a team of Microsoft.NET developers to build highly scalable event-driven enterprise applications.
- Subject matter expert on AEA certified airport devices in the context of proprietary and common-use (with ARINC, SITA and UltraCUSE) check-in and gate terminals.
- Led the development of a major legacy airline's IATA 2D barcode boarding pass roll-out on airport check-in counters and gates globally.
- **Relevant Skills:** Scrum, PCI Compliance, Test-Driven Development, API Security, MSMQ, SQL Server.

## Education

**De La Salle University**
*Bachelor of Science in Computer Science with Specialization in Information Technology*
May 2002 to April 2006 | Manila, Philippines

## Relevant Skills

- **Fraud Prevention & Risk Mitigation**: Anti-fraud systems, anomaly detection, AI-based fraud prevention.
- **Data-Driven Decision Making**: Business Intelligence (QuickSight, PowerBI, Tableau), SQL-based data analysis.
- **Technical Leadership & Agile Product Development**: Scrum, Kanban, Stakeholder Communication, Team Performance Management.
- **Cloud & Security Technologies**: API Security, Azure Security Center, AWS, Cloudflare Security, Network Anomaly Detection.
- **Software Development**: Microsoft.NET, C#, ASP.NET Core, NodeJS, PHP, SQL Server, PostgreSQL, MongoDB, Docker, GitLab, Jira.

## Certifications

- **Certified ScrumMaster (CSM)** – ScrumAlliance (April 2009, Certificant ID: 00005315)

---

# Recent Project Involvement  

**R&D: Backoffice Process Automation with AI Agents**  
Augmenting backoffice team throughput by using LLMs and machine learning enabled document intelligence solutions to validate incoming reward claims against uploaded proof of purchases. Performed prompt engineering to utilize structured outputs, function calling. Currently designing a secure Model Context Protocol (MCP) server that can enable LLMs to perform tasks depending on context. 

**Fraud Detection and Monitoring**
Reward promotions pay out cash or award gift incentives to customers that purchased a qualified product. A fraud score is calculated for incoming reward claims by observing emerging patterns based on:  
* Request Origin IP address
* Time of day (higher risk for claims submitted outside of business hours)
* Browser capabilities (incognito, fingerprint)
* Navigation patterns (claim submission completion time)
* Similarity to recently received claims
  * Purchases from same reseller
  * Timing of claims from same geographical location
* Fulfillment information (beneficiary bank account, gift delivery addresses)
* Validity of attached electronic proof of purchase (file metadata, file hash)

**Data Lake for Power BI**  
Developed automation to regularly extract data from transactional systems using SQL, export into Parquet, and uploaded to Azure Data Lake Storage to build Power BI reports.  

**Promotion Analytics and Reporting**
A complete re-think of how business units get up-to-date information on reward promotion performance.  On-going feature discovery and iterative prototyping.
*  **Current System:** Reports are generated in Excel on a schedule, sent to promotion contacts
*  **Problems:** 
   * Business contacts have different reporting needs, non-standard promotions require significant implementation effort
   * Reports for promotions with a lot of participants are too large to be sent via e-mail
*  **Solution:** Give business units access to a new web-based reporting system where 
   * Promotion administrators can:
     * Conveniently copy and customize KPI dashboards from existing promotions
     * Grant business contacts on a range of relevant promotions that they own
     * Monitor usage to get an insight of new reports or KPIs that can be introduced to business contacts
   * Business contacts can:
     * See promotion KPIs at a glance
     * Drill-down key data dimensions to claim level
     * Schedule regular export of claim data to Azure Data Lake Storage for use in their own Power BI dashboards  

**Loyalty Platform Re-architecture**
Breaking down monolithic web application to separate promotion content distribution from customer accounts. Introduce a build step to generate static HTML out of dynamic content that used to be fetched, evaluated, and written to responses for each HTTP request. Use a CDN to distribute and fetch and cache whole or partial HTML content.  Introduce and develop microfrontends for dynamic parts (such as showing customer account balances and transaction history)  