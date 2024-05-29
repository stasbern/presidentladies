# Read the CSV file
with open('public/lists/WL.csv', 'r') as file:
    lines = file.readlines()

# Remove any empty lines and trailing newline characters
lines = [line.strip() for line in lines if line.strip()]

# Create a list of strings
data = [f'"{line}"' for line in lines]

# Join the strings with a comma and newline character
json_output = ',\n'.join(data)

# Wrap the output with square brackets
json_output = f'[{json_output}]'

# Write the JSON output to a file
with open('public/lists/WL.json', 'w') as file:
    file.write(json_output)