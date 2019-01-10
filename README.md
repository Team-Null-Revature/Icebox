# Icebox
Icebox is a cheaply made clone of Dropbox.

## Development Environment
You will need the following installed on your system.
- [Eclipse EE](https://www.eclipse.org/downloads/packages/release/2018-12/r/eclipse-ide-enterprise-java-developers)
- [Tomcat v9](https://tomcat.apache.org/download-90.cgi)
- [Node v11](https://nodejs.org/en/)

### Setup
- Set Eclipse to reload files changed outside of eclipse.
    - Window -> Preferences -> General -> Workspace -> Check "Refresh using native hooks or polling"
- Set Eclipse to ignore the "node_modules" folder.
    - Right-Click on the project -> Properties -> Resource -> Resource Filters -> Add Filter -> Click "Exclude all","Folders", "All children", and enter the following into the text box "node_modules".
- Add the Tomcat server to Eclipse.
    - Servers -> Right Click -> New -> Server -> Apache -> Tomcat v9 -> Browse to the Tomcat installation directory -> Deploy
- Run `./mvnw clean package`   

### Development
Doing the following will allow changes made in Angular as well as Java to be automatically compiled and deployed onto Tomcat.
- Open CMD to src/main/angular and run `ng build --watch`
- Start the Eclipse Tomcat Server.

### Packaging
To create a war package run the following command.
- `./mvnw clean package`
