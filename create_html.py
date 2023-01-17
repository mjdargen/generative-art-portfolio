import os
import re

input("Don't use this anymore.")
quit()

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

htmls = [f for f in os.listdir(DIR_PATH) if f.endswith(
    ".html") and not f.startswith("_")]
print(htmls)

for html in htmls:
    with open(os.path.join(DIR_PATH, html), 'r', encoding="utf-8") as f:
        contents = f.read()

    para = ""
    match = re.search(r"(<p[\s\S]*?>)([\s\S]*?)(</p>)", contents)
    if match:
        para = match.group(2)
        print(match.group(2))

    js = html.replace(".html", ".js")
    title = html.split(".")[0].split("_")
    title = f"{title[0].title()} - {' '.join(title[1:]).title()}"
    print(js)
    print(title)

    output = f'''
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>

    <link rel="stylesheet" href="style.css">
    <script src="libraries/p5.min.js"></script>
    <!-- <script src="libraries/p5.sound.min.js"></script> -->
    <script src="{js}"></script>
    <script src="utility.js"></script>

</head>

<body>
    <p>{para}</p>
    <main>
    </main>
</body>


</html>
    '''

    with open(os.path.join(DIR_PATH, html), 'w', encoding="utf-8") as f:
        f.write(output)
