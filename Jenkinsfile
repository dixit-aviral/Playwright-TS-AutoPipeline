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
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

   post {
    always {
        archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
    }
}

}
