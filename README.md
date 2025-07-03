# AWS Elastic Beanstalk Node.js Continuous Deployment Pipeline

A hands-on Node.js activity application demonstrating end-to-end continuous delivery on AWS Elastic Beanstalk.

## 🚀 Overview

This project showcases a simple Node.js web application designed to run on AWS Elastic Beanstalk, featuring:

- **Simple HTTP Server**: Basic Node.js server with HTML serving capabilities
- **Scheduled Tasks**: Cron job integration using AWS SQS daemon
- **Logging**: Application logging to `/tmp/sample-app.log`
- **Elastic Beanstalk Ready**: Pre-configured for AWS deployment

## 📁 Project Structure

```text
├── app.js          # Main Node.js application server
├── index.html      # Frontend HTML page
├── styles.css      # CSS styling for the web interface
├── package.json    # Node.js dependencies and scripts
├── cron.yaml       # Scheduled task configuration
└── README.md       # This file
```

## 🛠️ Features

### Web Server

- Serves a congratulatory HTML page on GET requests
- Handles POST requests for message logging
- Processes scheduled tasks via AWS SQS daemon

### Scheduled Tasks

- Configured to run every minute (`* * * * *`)
- Sends POST requests to `/scheduled` endpoint
- Logs task execution with timestamps

## 📊 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serves the main HTML page |
| POST | `/` | Logs received messages |
| POST | `/scheduled` | Handles scheduled cron tasks |

## 🔧 Configuration

### Cron Jobs

Scheduled tasks are configured in `cron.yaml`:

- **task1**: Runs every minute, sends POST to `/scheduled`

## ☁️ AWS Services

This project leverages several AWS services to create a complete continuous deployment pipeline:

- **AWS CodePipeline** – Orchestrates the flow from your GitHub source through deploy to Elastic Beanstalk
- **AWS Elastic Beanstalk** – Hosts your Node.js application and receives each new application version
- **AWS Identity and Access Management (IAM)** – Used to create both the Beanstalk service role (`aws-elasticbeanstalk-service-role`) and the EC2 instance profile
- **AWS CloudFormation** – Runs "under the covers" when Elastic Beanstalk spins up your application environment
- **Amazon EC2** – The underlying compute (key pairs, instance profile) that Elastic Beanstalk provisions to run your app

## 📝 Logging

Application logs are written to `/tmp/sample-app.log` and include:

- Timestamp of each entry
- Received messages from POST requests
- Scheduled task execution details
