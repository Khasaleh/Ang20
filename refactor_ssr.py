import os
import re
import sys

def refactor_file_for_ssr(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    if '@Inject(PLATFORM_ID)' in content:
        print(f"Skipping {file_path}, already refactored.")
        return

    # Add imports
    if 'isPlatformBrowser' not in content:
        content = "import { isPlatformBrowser } from '@angular/common';\n" + content
    if '@Inject' not in content or 'PLATFORM_ID' not in content:
        content = "import { Inject, PLATFORM_ID } from '@angular/core';\n" + content

    # Add isBrowser property and inject PLATFORM_ID
    content = re.sub(
        r'(export class \w+\s*(implements\s*\w+\s*)?{)',
        r'\1\n  private isBrowser: boolean;',
        content
    )
    content = re.sub(
        r'(constructor\(([^)]*)\))',
        r'\1, @Inject(PLATFORM_ID) private platformId: object',
        content,
        1 # Only replace the first occurrence
    )
    content = re.sub(
        r'(constructor\([^)]*\)\s*{)',
        r'\1\n    this.isBrowser = isPlatformBrowser(this.platformId);',
        content
    )

    # Find all methods and wrap their content
    methods = re.findall(r'(\w+\s*\([^)]*\)\s*(:\s*\w+\s*)?{\s*([^}]+)})', content)
    for method_full, _, _, method_body in methods:
        if 'localStorage' in method_body or 'sessionStorage' in method_body or 'window' in method_body or 'document' in method_body:
             new_method_body = f"if (this.isBrowser) {{\n{method_body}\n}}"
             content = content.replace(method_body, new_method_body)


    with open(file_path, 'w') as f:
        f.write(content)

    print(f"Refactored {file_path} for SSR safety.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Please provide a list of files to refactor.")
        sys.exit(1)

    files_to_refactor = sys.argv[1:]
    for file_path in files_to_refactor:
        refactor_file_for_ssr(file_path)
