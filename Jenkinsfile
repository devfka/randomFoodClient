pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh "npm install"
        sh "ng build"
      }
    }
    stage('Test') {
      steps {
        sh "ng build"
      }
    }
    stage('Docker Build') {
      agent any
      steps {
        sh 'sudo -i chmod 777 /var/run/docker.sock'
        sh 'docker image build -t dockerfka/randomfoodclient .'
      }
    }
    stage('Docker Push') {
      agent any
      steps {
        withCredentials([usernamePassword(credentialsId: 'myDocker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          sh "docker login -u ${env.USERNAME} -p ${env.PASSWORD}"
          sh 'docker push dockerfka/randomfoodclient:latest'
        }
      }
    }
  }
}
