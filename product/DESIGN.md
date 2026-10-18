---
version: alpha
name: Isaac Ndahura — Personal Archive
color: "#171713"
secondary: "#55534B"
tertiary: "#8A462F"
neutral: "#F4EFE6"
---

colors:
  primary: "{color}"
  secondary: "{secondary}"
  tertiary: "{tertiary}"
  neutral: "{neutral}"
typography:
  display:
    fontFamily: "Oswald, sans-serif"
    fontSize: "96px"
    fontWeight: 600
    lineHeight: "0.92"
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.55"
  utility:
    fontFamily: "DM Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: "1.35"
spacing:
  unit: "8px"
  section: "clamp(5rem, 10vw, 9rem)"
  page-gutter: "clamp(1.25rem, 5vw, 5rem)"
rounded:
  none: "0px"
  print: "2px"
components:
  page-frame:
    width: "90rem"
    padding: "{spacing.page-gutter}"
  section-heading:
    typography: "{typography.display}"
    textColor: "{colors.primary}"
  fragment:
    backgroundColor: "{colors.neutral}"
    rounded: "{rounded.none}"
  shelf-object:
    rounded: "{rounded.print}"
  focus-ring:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    size: "2px"
    padding: "4px"
