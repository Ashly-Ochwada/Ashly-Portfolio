import React, { useEffect, useState } from "react";
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from "./NavbarStyledComponent";
import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";
import { WbSunny, NightsStay } from "@mui/icons-material";
import { useTheme } from "styled-components";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState("");
  const theme = useTheme();

  const handleScroll = () => {
    const sections = ["about", "skills", "experience", "projects", "education"];
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop - height / 3 && scrollPosition < offsetTop + height) {
          setActiveSection(section);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: "20",
              cursor: "pointer",
            }}
          >
            <DiCssdeck size="3rem" />{" "}
            <Span
              style={{
                color: theme.primary,
                padding: "10px 16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              AWO
            </Span>
          </a>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          {["about", "skills", "experience", "projects", "education"].map((section) => (
            <NavLink
              key={section}
              href={`#${section}`}
              style={{
                color: activeSection === section 
                  ? theme.primary 
                  : darkMode ? "white" : "black", 
                fontWeight: activeSection === section ? "bold" : "normal",
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
          </NavLink>
          
          ))}
        </NavItems>
        <ButtonContainer>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: darkMode ? "white" : "black",
                color: darkMode ? "black" : "white",
                padding: "4px 8px",
                fontSize: "10px",
                border: "none",
                borderRadius: "19px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
              }}
            >
              {darkMode ? (
                <>
                  <WbSunny style={{ marginRight: "8px" }} />
                  Light
                </>
              ) : (
                <>
                  <NightsStay style={{ marginRight: "8px" }} />
                  Dark
                </>
              )}
            </button>
          </div>
        </ButtonContainer>
        {isOpen && (
          <MobileMenu
            isOpen={isOpen}
            style={{
              backgroundColor: darkMode ? "black" : "white",
              color: darkMode ? "white" : "black",
            }}
          >
            {["about", "skills", "experience", "projects", "education"].map(
              (section) => (
                <MobileLink
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    color: activeSection === section
                      ? theme.primary
                      : darkMode
                      ? "white"
                      : "black",
                    fontWeight: activeSection === section ? "bold" : "normal",
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </MobileLink>
              )
            )}
          </MobileMenu>
        )}

      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;

