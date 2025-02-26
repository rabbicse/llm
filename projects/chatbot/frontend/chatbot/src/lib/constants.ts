export const CHAT_ID = 'search' as const

export const DUMMY_MESSAGE = `<think>Okay, the user wants a simple HTML login form. Let me break down what I need to do.
First, I'll start with the basic structure of an HTML page. That means opening the html file with the docx CODS syntax and setting up the DOCTYPE, html, head, and body tags.
In the head section, I need to include a title and some CSS styling to make it look neat. The form should be centered both vertically and horizontally so it's easy to use on any screen size. I'll use flexbox classes for that.
Now, for the form itself. It should have fields for email, password, remember me, and forgot my password buttons. I'll structure these as input fields and buttons. Oh, and an email and password strength indicator would be nice to show how secure each field is when filled in correctly, but maybe not necessary for a simple form.
Each form group will have a label and an input or button element. Labels should say something clear like "Email" and "Password." The inputs will need validation. I'll make sure the password field isn't longer than 60 characters and requires at least 8 characters. For remember me, maybe add a checkbox, but actually, the default behavior is not secure, so maybe just disable saving if the user enters something wrong. Similarly, for the forgot my password button, it should be disabled when someone types "Forgot" on the first try.
Putting all these together, I'll write the HTML structure with each section properly indented. Then, in the CSS, I'll style everything neatly—centering, using appropriate fonts, and styling buttons to look clickable.
Finally, I'll test the form to make sure it's functional: saving emails, entering invalid data, and making sure the remember me and forgot my password buttons work correctly. That should cover all bases for a simple yet effective login form.</think>
Here's a clean HTML login form with basic styling:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content=center;
            align-items-center;
            height: 100vh;
            margin: 0;
            background-color: #f0f2f5;
        }
        .form-container {
            width: 300px;
            max-width: 500px;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        h1 {
            color: #1a76e9; /* Bold */
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }
        input,
        textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #e6f3ff;
            outline: none;
        }
        .button-group {
            margin-top: 20px;
        }
        button {
            padding: 10px 20px;
            margin-right: 5px;
            cursor: pointer;
        }
        input[type="password"] {
            width: 100%;
            display: block;
        }
        .strength-indicator {
            position: absolute;
            top: 5px;
            right: 5px;
            color: #1a76e9;
            font-size: 0.3em;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h1>Login</h1>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email"
                    placeholder="Enter your email address"
                    step="same"
                    value="example@example.com"
                    required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                    id="password"
                    placeholder="Enter your password
                            (at least 8 characters)
                            (lowercase and uppercase allowed)"
                    step="enter"
                    value="example"
                    required>
            </div>
            <div class="button-group">
                <button type="submit">Save Login</button>
                <label for="rememberMe">Remember me?</label>
                <input type="checkbox" id="rememberMe"
                    value="Remember me"
                    name="rememberMe"
                    checked>
            </div>
            <div class="form-group">
                <label for="forgotPassword">Forgot Password?</label>
                <button type="submit" disabled>
                    Forgot Password?
                </button>
            </div>
        </form>
    </div>
</body>
</html>
\`\`\`

This form includes:
1. Clean and centered layout
2. Basic styling with CSS
3. Email input field
4. Password input field
5. Remember me checkbox (default: unchecked)
6. Forgot password link that is disabled if you already entered a correct password
7. Input validation for password length and minimum characters
8. Responsive design that works on different screen sizes

Features:
- Proper form validation
- Simple error messages
- Visual feedback when fields are filled correctly
- Basic styling to make it look professional

You can customize the colors, spacing, and other properties by modifying the CSS in the style section.

Remember you entered your email address, password, remember me checkbox (uncheck first if trying to login), and forgot my password link.`;