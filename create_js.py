import os
import json

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

jss = [f for f in os.listdir(DIR_PATH) if f.endswith(".js") and '_' in f]
print(jss)

students = []
data = {}

for js in jss:
    title = js.split(".")[0].split("_")
    student = title[0].title()
    if student not in students:
        students.append(student)
        data[student] = {}
    title = f"{title[0].title()} - {' '.join(title[1:]).title()}"

    link = js.replace(".js", ".html")
    print(title)
    print(link)

print(students)


for js in jss:
    title = js.split(".")[0].split("_")
    student = title[0].title()
    title = f"{' '.join(title[1:]).title()}"
    link = js.replace(".js", ".html")

    data[student][title] = link

print(data)


with open("students.json", "w") as f:
    json.dump(data, f, indent=2)
