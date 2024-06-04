FROM openjdk:17-jdk
VOLUME /tmp
COPY target/*.jar app.jar
COPY src/main/resources/templates /BOOT-INF/classes/templates

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]