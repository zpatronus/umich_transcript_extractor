import re
import os


def clean_webvtt(input_path, output_path):
    with open(input_path, "r") as file:
        lines = file.readlines()

    transcript_lines = []
    for line in lines:
        if (
            re.match(
                r"\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}", line
            )
            or line.strip() == ""
        ):
            continue
        transcript_lines.append(line.strip())

    transcript = " ".join(transcript_lines)
    with open(output_path, "w") as output_file:
        output_file.write(transcript)


def process_all_files():
    raw_folder = "raw"
    output_folder = "output"
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(raw_folder):
        input_path = os.path.join(raw_folder, filename)
        output_path = os.path.join(output_folder, filename)
        clean_webvtt(input_path, output_path)
        print(f"Processed {filename}")


if __name__ == "__main__":
    process_all_files()
