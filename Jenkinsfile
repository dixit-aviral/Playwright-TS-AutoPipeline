pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/dixit-aviral/Playwright-TS-AutoPipeline.git',
                    credentialsId: 'github-https-creds'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            junit 'playwright-report/*.xml' // if you generate JUnit XML reports
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
