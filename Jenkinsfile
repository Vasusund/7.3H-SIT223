pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // must match the name in Jenkins Global Tool Configuration
    }

    environment {
        PATH = "${tool 'NodeJS 18'}/bin:${env.PATH}"
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies and building app...'
                sh 'rm -rf node_modules'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Jest tests...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npx eslint src/** || true'
            }
        }

        stage('Security') {
            steps {
                echo 'Checking for vulnerable packages...'
                sh 'npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to GitHub Pages...'
                // Make sure GITHUB_TOKEN or personal access token is set in Jenkins credentials
                withCredentials([string(credentialsId: 'github-token', variable: 'GH_TOKEN')]) {
                    sh 'npm run deploy'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
