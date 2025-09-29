pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 18', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                echo 'Checking out code from GitHub...'
                git url: 'https://github.com/Vasusund/7.3H-SIT223.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                echo 'Building React app...'
                sh 'npm run build'
                archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest tests...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Security') {
            steps {
                echo 'Running npm audit for security vulnerabilities...'
                sh 'npm audit --audit-level=moderate || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application to test environment...'
                sh 'npm install -g serve'
                sh 'serve -s build -l 5000 &'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
