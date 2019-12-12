pipeline {
    agent any
environment {
    
    registry = "casestudiesnbs/node-backend"
    registryCredential = "76df3ed5-c60d-4d29-b6d8-f27e213139f8"
    dockerImage = ''
}
    stages {
	stage('test') {
	    steps {
		echo "no junit or intergration tests"
	    }
	}
        stage('Build') {
            steps {
		    sh 'npm i express'
		    sh 'npm i cookie-parser'
		    sh 'npm i body-parser'
		    sh 'npm i path'
		    sh 'npm i cors'
		    sh 'npm i mysql'
		    sh 'npm i express session'
		    script {
                     dockerImage = docker.build registry + ":latest"
             }
            }
        }
        stage('Deploy') {
            steps {   
             script {
                    docker.withRegistry( '', registryCredential ) {
                      dockerImage.push()
            }
}
}
        }
        stage('Testing Environment') {
            steps {
                echo "API Tests not found"
            }
        }
        stage('Staging') {
          when{
              expression{
              env.BRANCH_NAME=='staging'
              }
          }
            steps {
                sh 'sudo docker-compose pull'
                sh 'PROFILE=staging docker-compose up -d'
                sh 'mvn test -Dtest=SeleniumSuite'
            }
        }
        stage('Production') {
            when{
                expression{
                env.BRANCH_NAME=='master'
                }
            }
            steps {
                sh 'sudo docker-compose downn'
                script {
                  docker.withRegistry( '', registryCredential ) {
                  dockerImage.pull()
                  }
                sh 'sudo docker-compose up -d'
                echo "Production started"
            }
        }
    }
}
}
