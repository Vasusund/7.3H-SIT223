pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"   // Use the NodeJS version you already configured in Jenkins
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies and building project...'
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
                // Only check JS/JSX files, not CSS or images
                sh 'npx eslint "src/**/*.js" || true'

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
    }
}
