<script>
  import { onMount } from "svelte";
  import Header from "../components/Header.svelte";
  import { currentPage } from "../stores/currentPage.js";

  onMount(() => {
    currentPage.update(currentPage => "Glossary");
  });
</script>

<svelte:head>
  <title>Glossary| OpenACR Editor | GSA</title>
</svelte:head>

<Header>Glossary</Header>

<p>
  A glossary of terms related to OpenACR.
</p>

<dl>
  <dt>Accessibility</dt>
  <dd>The measure of a web page's usability by persons with one or more disabilities.</dd>
  <dt>Accessibility Conformance Report (ACR)</dt>
  <dd>A description how the offering will address all of the accessibility requirements outlined in the solicitation and the
    evaluation methods used to validate the findings.</dd>
  <dt>Accessibility Maturity Model</dt>
  <dd>An assessment of an organization's understanding and capacity to address accessibility. This often includes ensuring that an 
  organization includes people with disability in staff (including in positions of responsibility).</dd>
  <dt>Accessibility Statement</dt>
  <dd>A written confirmation about an organization's concern and work on being more inclusive for people with disabilities.
  This usually provides information about accessibility goals and efforts to achieve them. Often there are links to ACRs if the 
  organization sells products or services. </dd>
  <dt>Accommodations</dt>
  <dd>The modification of a product or service so that an individual can perform job functions efficiently and safely. This is often needed
    if a product fails to meet Section 508 requirements. Accommodations after the fact are always more expensive than building an accessible solution.</dd>
  <dt>Assistive technologies</dt>
  <dd>Technology designed so people with disabilities have greater functional capabilities with computer-based systems. 
    This could be software or hardware and often benefits a broader range of computer users.</dd>
  <dt>Americans with Disabilities Act of 1990 (ADA)</dt>
  <dd>A United States civil rights law that prohibits discrimination based on disability.</dd>
  <dt>Automated Testing</dt>
  <dd>Software can now test for many accessibility barriers. This is becoming increasingly important piece of developing and maintaining software.
    No automated tools can check for all Section 508 requirements, and so automated testing is a necessary part of an effective
    testing strategy but insufficient on its own.</dd>
  <dt>Barrier</dt>
  <dd>Includes anything physical, architectural, technological or attitudinal, anything that is based on information or 
    communications or anything that is the result of a policy or a practice that hinders the full and equal participation 
    in society of persons with an impairment, including a physical, mental, intellectual, cognitive, learning, communication or 
    sensory impairment or a functional limitation.</dd>
  <dt>Commercial off-the-shelf (COTS)</dt>
  <dd>Software that can be purchased and implemented with little or no customization requirements.</dd>
  <dt>Content management system (CMS)</dt>
  <dd>CMS is a software application used to oversee the operation of web information. 
    Common CMS applications include software like WordPress and Drupal.</dd>
  <dt>Customer Experience (CX) / Human Centred Design (HCD)</dt>
  <dd>The totality of cognitive, affective, sensory, and behavioral responses during all stages of the process. Effective CX and HCD also
    includes people with disabilities.</dd>
  <dt>Disability</dt>
  <dd>Any impairment, including a physical, mental, intellectual, cognitive, learning, communication or sensory impairment — or a functional limitation — 
    whether permanent, temporary or episodic in nature, or evident or not, that, in interaction with a barrier, hinders a person's 
    full and equal participation in society. </dd>
  <dt>Discoverability</dt>
  <dd>The ability of any feature to be found in the context in which it is needed.</dd>
  <dt>European Harmonized Accessibility Standards (EN 301 549)</dt>
  <dd>This is evolving to become the global standard for government policy. 
    This is an evolving standard that roughly follows and extends the WCAG Guidelines.</dd>
  <dt>False positives</dt>
  <dd>An error in data reporting in which a test result improperly indicates the presence of a condition.</dd>
  <dt>Government off-the-shelf (COTS)</dt>
  <dd>IT which is developed and maintained by the government</dd>
  <dt>Government Product Accessibility Template (VPAT)</dt>
  <dd>A legacy ACR which was developed by a government agency. This is not currently being maintained.</dd>
  <dt>Graceful degradation</dt>
  <dd>When a site utilizes new technology and, if disabled, the content maintains effectiveness for the user.</dd>
  <dt>Internationalization</dt>
  <dd>A system whose primary design has been developed to work in multiple languages and in the cultural contexts of different locales.</dd>
  <dt>Information Communications Technology (ICT)</dt>
  <dd>ICT is an extensional term of the term information technology (IT). 
    It refers to the gambit of technology involved in digital communications.</dd>
  <dt>Lived Experience</dt>
  <dd>Testing with people who have lived experience of disability is ultimately the most valuable.</dd>
  <dt>Localization</dt>
  <dd>Customizing or adapting a national or international product for a local market.</dd>
  <dt>Manual Testing</dt>
  <dd>With a little training, most people can do basic testing using just a keyboard (with no mouse). With additional training, users can
  get a basic sense of how to use other assistive technology. Effective screen reader testing takes considerable experience.</dd>
  <dt>Medical model of disability</dt>
  <dd>An understanding of disabilityy based on the biomedical perception of disability. This model links a disability diagnosis 
    to an individual's physical body. The model supposes that this disability may reduce the individual's quality of life and 
    the aim is, with medical intervention, this disability will be diminished or corrected</dd>
  <dt>Open Source Software (OSS)</dt>
  <dd>Software that is made freely available including possible modification and redistribution. 
    Products include permission to use the source code, design documents, or content of the product.</dd>
  <dt>Section 504</dt>
  <dd>Section 504 of the Rehabilitation Act of 1973. This act has implications for federal assistance and accommodation in the workplace. 
    If an organization receives federal support of any kind, even if the organization is not a federal or state organization, 
    the organization must comply with Section 504.</dd>
  <dt>Section 508</dt>
  <dd>Section 508 of the Rehabilitation Act was enacted to eliminate barriers in information technology, to make available new 
    opportunities for people with disabilities, and to encourage development of technologies that will help achieve these goals. 
    The law applies to all Federal agencies when they develop, procure, maintain, or use electronic and information technology. 
    Until the Section 508 Refresh, this requirement was based on best practices of 1998.</dd>
  <dt>Section 508 Refresh</dt>
  <dd>The Refresh brought the guidelines for the USA to be essentially the same as WCAG 2.0 AA.</dd>
  <dt>Semantics</dt>
  <dd>Semantics is the idea of creating more meaning with the information in digital content. 
    This makes it easier for devices to understand what each aspect of the code means for the end user. 
    HTML5 markup has been optimized to allow developers to create more semantic markup.</dd>
  <dt>Social model of disability</dt>
  <dd>An approach to understanding disability which identifies systemic barriers, derogatory attitudes, and social exclusion 
    (intentional or inadvertent), which make it more difficult or impossible for people with disabilities to function.</dd>
  <dt>Software as a service (SaaS)</dt>
  <dd>A software licensing and delivery model in which software is licensed on a subscription basis and is centrally hosted</dd>
  <dt>Usability</dt>
  <dd>The principle that information and applications should not only be accessible but also easy to use and understand.</dd>
  <dt>Voluntary Product Accessibility Template (VPAT™)</dt>
  <dd>The most commonly used ACR format which is maintained by the Information Technology Industry Council. 
    It is a static document that describes how software, hardware, electronic content, and support documentation meet accessibility requirements.
    VPATs often required in procurement to help buyers understand how accessible a product might be and help to discover deficiencies.</dd>
  <dt>Web Content Accessibility Guidelines (WCAG) 2.0, 2.1, 2.2 & 3.0</dt>
  <dd>WCAG 2.0 is focused on providing an international technical standard for web content. 
    It has 12 guidelines that are organized under four principles: Perceivable, Operable, Understandable, and Robust (ie. POUR). 
    The guidelines each have a testable success criteria, which are at three levels: A, AA, and AAA. The latest recommendation is 2.1, 
    2.2 is nearly published, and 3.0 is actively being developed.</dd>
  <dt>Widget</dt>
  <dd>A widget is a small application installed and used on websites. Each widget has a varying amount of purposes. An example of a widget is a small, 
    email newsletter signup form, or a third-party live chat functionality.</dd>
</dl>
