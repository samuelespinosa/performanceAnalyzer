#!/bin/bash

# Verify SSH_PRIVATE_KEY
if [ -z "${SSH_PRIVATE_KEY}" ]; then
  echo "Error: SSH_PRIVATE_KEY is not set."
else
  echo "SSH_PRIVATE_KEY is set."
  echo "First few characters of the key:"
  echo "${SSH_PRIVATE_KEY}" | head -c 10
fi

# Verify SSH_USER
if [ -z "${SSH_USER}" ]; then
  echo "Error: SSH_USER is not set."
else
  echo "SSH_USER is set to: ${SSH_USER}"
fi

# Verify SSH_HOST
if [ -z "${SSH_HOST}" ]; then
  echo "Error: SSH_HOST is not set."
else
  echo "SSH_HOST is set to: ${SSH_HOST}"
fi
