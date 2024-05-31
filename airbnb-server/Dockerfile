FROM openjdk:17-jdk
VOLUME /tmp
COPY target/*.jar app.jar
COPY src/main/resources/templates /BOOT-INF/classes/templates
COPY src/main/resources/firebase.json src/main/resources/
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]