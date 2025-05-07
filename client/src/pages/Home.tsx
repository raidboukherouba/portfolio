import ContactSection from "../components/sections/contactUs";
import ProfileSection from "../components/sections/profile";
import ProjectsSection from "../components/sections/projects";
import ResumeSection from "../components/sections/resume";
import SkillsSection from "../components/sections/skills";

export default function HomePage(){
    return(
        <>
            <ProfileSection />
            <ResumeSection/>
            <SkillsSection/>
            <ProjectsSection/>
            <ContactSection/>
        </>
    )
}