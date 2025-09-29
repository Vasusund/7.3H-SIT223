pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies and building...'
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
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
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.name "jenkins-bot"
                        git config user.email "jenkins@example.com"

                        npm install -g gh-pages
                        gh-pages -d build -u "https://$GITHUB_TOKEN@github.com/<your-username>/<your-repo>.git"
                    '''
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
