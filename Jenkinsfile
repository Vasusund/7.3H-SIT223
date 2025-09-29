pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18'   // Make sure NodeJS 18 is installed in Jenkins tools
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
                echo 'Installing dependencies and building the app...'
                sh 'rm -rf node_modules'
                sh 'npm ci'
                sh 'npm run build'           // Build artifact created in /build
                archiveArtifacts artifacts: 'build/**', fingerprint: true
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
                sh 'eslint src/**/*.js || true'     // Run ESLint, continue even if there are warnings
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
                echo 'Deploying React app to GitHub Pages...'
                sh 'npm install -g gh-pages'
                sh 'npm run deploy'   // Assumes "homepage" is set in package.json
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully! App deployed to GitHub Pages.'
        }
        failure {
            echo 'Pipeline failed. Check logs!'
        }
    }
}
