
#!/usr/bin/env bash

## Complete the following steps to get Docker running locally

# Step 1:
# Build image and add a descriptive tag
docker build -t gallery-capstone-app .

# Step 2: 
# List docker images
docker images ls

# Step 3: 
# Run app
docker run -it --rm -p 80:80 --name gallery-capstone-app gallery-capstone-app