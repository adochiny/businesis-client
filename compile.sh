mvn clean package -Dmaven.test.skip=true
cp target/aManager.war /home/adonis/jboss/wildfly-8.1.0.Final/standalone/deployments/
