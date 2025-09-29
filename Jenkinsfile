pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'   // Make sure NodeJS 18 is installed in Jenkins
    }

    environment {
        PATH = "${tool('NodeJS 18')}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main', url: 'https://github.com/Vasusund/7.3HD-DEV-deakin.git'
            }
        }

        stage('Build') {
    steps {
        echo 'Cleaning up old references...'
        // Remove any import lines that mention TalkAIChat
        sh "grep -rl 'TalkAIChat' src/ | xargs sed -i '' '/TalkAIChat/d' || true"
        
        echo 'Installing dependencies and building app...'
        sh 'rm -rf node_modules'
        sh 'npm install'
        sh 'npm run build'
    }
}


        stage('Test') {
            steps {
                echo 'Running tests with Jest...'
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Code Quality') {
            steps {
                echo 'Running ESLint for code quality...'
                sh 'npm install -g eslint@8.0.0'
                sh 'eslint src/**/*.js || true'
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
                echo 'Deploying to GitHub Pages...'
                sh 'npm install -g gh-pages'
                sh 'npm run deploy'   // Make sure package.json has a deploy script
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! App built and deployed.'
        }
        failure {
            echo 'Pipeline failed. Check the logs!'
        }
    }
}
