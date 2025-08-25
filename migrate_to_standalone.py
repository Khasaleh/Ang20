import os
import re
from pathlib import Path
import time
import sys

def get_component_selector(component_path):
    with open(component_path, 'r') as f:
        content = f.read()
        match = re.search(r"selector:\s*'([^']*)'", content)
        if match:
            return match.group(1)
    return None

def get_template_content(component_path):
    with open(component_path, 'r') as f:
        content = f.read()
        template_match = re.search(r"templateUrl:\s*'([^']*)'", content)
        if template_match:
            template_url = template_match.group(1)
            template_path = os.path.join(os.path.dirname(component_path), template_url)
            if os.path.exists(template_path):
                with open(template_path, 'r') as tf:
                    return tf.read()

        template_inline_match = re.search(r"template:\s*`([^`]*)`", content, re.DOTALL)
        if template_inline_match:
            return template_inline_match.group(1)

    return ''

def find_used_components(template_content, all_components):
    used_selectors = {}
    for selector, component_info in all_components.items():
        if f'<{selector}' in template_content:
            used_selectors[selector] = component_info
    return used_selectors

def get_dependencies(template_content, all_components):
    dependencies = set()
    if re.search(r'\*ngIf', template_content) or re.search(r'\[ngIf\]', template_content) or re.search(r'\[ngClass\]', template_content) or re.search(r'\| async', template_content) or re.search(r'\| date', template_content) or re.search(r'\| titlecase', template_content):
        dependencies.add('CommonModule')
    if re.search(r'\*ngFor', template_content):
        dependencies.add('CommonModule')
    if re.search(r'\[(ngModel)\]', template_content):
        dependencies.add('FormsModule')
    if re.search(r'\[(formGroup)\]', template_content) or re.search(r'formControlName', template_content):
        dependencies.add('ReactiveFormsModule')
    if re.search(r'routerLink', template_content):
        dependencies.add('RouterModule')
    if re.search(r'\| translate', template_content):
        dependencies.add('TranslateModule')
    if re.search(r'<mat-card', template_content): dependencies.add('MatCardModule')
    if re.search(r'<mat-form-field', template_content): dependencies.add('MatFormFieldModule')
    if re.search(r'matInput', template_content): dependencies.add('MatInputModule')
    if re.search(r'<mat-icon', template_content) or re.search(r'mat-icon-button', template_content): dependencies.add('MatIconModule')
    if re.search(r'mat-button', template_content) or re.search(r'mat-raised-button', template_content) or re.search(r'mat-icon-button', template_content): dependencies.add('MatButtonModule')
    if re.search(r'<mat-menu', template_content) or re.search(r'\[matMenuTriggerFor\]', template_content): dependencies.add('MatMenuModule')
    if re.search(r'<mat-select', template_content): dependencies.add('MatSelectModule')
    if re.search(r'<mat-checkbox', template_content): dependencies.add('MatCheckboxModule')
    if re.search(r'<mat-radio-group', template_content): dependencies.add('MatRadioModule')
    if re.search(r'<mat-datepicker', template_content): dependencies.add('MatDatepickerModule')
    if re.search(r'<mat-slide-toggle', template_content): dependencies.add('MatSlideToggleModule')
    if re.search(r'<mat-dialog', template_content): dependencies.add('MatDialogModule')
    if re.search(r'<mat-list', template_content): dependencies.add('MatListModule')
    if re.search(r'<mat-grid-list', template_content): dependencies.add('MatGridListModule')
    if re.search(r'<mat-stepper', template_content): dependencies.add('MatStepperModule')
    if re.search(r'<mat-tab', template_content): dependencies.add('MatTabsModule')
    if re.search(r'<mat-expansion-panel', template_content): dependencies.add('MatExpansionModule')
    if re.search(r'<mat-chip', template_content): dependencies.add('MatChipsModule')
    if re.search(r'<mat-spinner', template_content): dependencies.add('MatProgressSpinnerModule')
    if re.search(r'<mat-progress-bar', template_content): dependencies.add('MatProgressBarModule')
    if re.search(r'matTooltip', template_content): dependencies.add('MatTooltipModule')
    if re.search(r'matSnackBar', template_content): dependencies.add('MatSnackBarModule')
    if re.search(r'<mat-table', template_content): dependencies.add('MatTableModule')
    if re.search(r'matSort', template_content): dependencies.add('MatSortModule')
    if re.search(r'<mat-paginator', template_content): dependencies.add('MatPaginatorModule')

    used_components = find_used_components(template_content, all_components)
    for selector, component_info in used_components.items():
        dependencies.add(component_info['class_name'])

    return dependencies, used_components

def migrate_component_to_standalone(component_path, all_components):
    with open(component_path, 'r') as f:
        content = f.read()

    if 'standalone: true' in content:
        print(f"Skipping {component_path}, already standalone.")
        return

    template_content = get_template_content(component_path)
    dependencies, used_components = get_dependencies(template_content, all_components)

    imports_str = ',\n    '.join(sorted(list(dependencies)))

    modified_content = content

    # Add standalone: true and imports array
    if imports_str:
        modified_content = re.sub(r'(@Component\({)', r'\1\n  standalone: true,\n  imports: [\n    ' + imports_str + '\n  ],', modified_content, 1)
    else:
        modified_content = re.sub(r'(@Component\({)', r'\1\n  standalone: true,', modified_content, 1)

    # Add imports
    angular_imports = {
        "CommonModule": "@angular/common", "FormsModule": "@angular/forms", "ReactiveFormsModule": "@angular/forms", "RouterModule": "@angular/router",
        "TranslateModule": "@ngx-translate/core", "MatDialogModule": "@angular/material/dialog", "MatIconModule": "@angular/material/icon",
        "MatFormFieldModule": "@angular/material/form-field", "MatInputModule": "@angular/material/input", "MatSelectModule": "@angular/material/select",
        "MatCheckboxModule": "@angular/material/checkbox", "MatRadioModule": "@angular/material/radio", "MatDatepickerModule": "@angular/material/datepicker",
        "MatNativeDateModule": "@angular/material/core", "MatSliderModule": "@angular/material/slider", "MatSlideToggleModule": "@angular/material/slide-toggle",
        "MatMenuModule": "@angular/material/menu", "MatSidenavModule": "@angular/material/sidenav", "MatToolbarModule": "@angular/material/toolbar",
        "MatListModule": "@angular/material/list", "MatGridListModule": "@angular/material/grid-list", "MatCardModule": "@angular/material/card",
        "MatStepperModule": "@angular/material/stepper", "MatTabsModule": "@angular/material/tabs", "MatExpansionModule": "@angular/material/expansion",
        "MatButtonToggleModule": "@angular/material/button-toggle", "MatChipsModule": "@angular/material/chips", "MatProgressSpinnerModule": "@angular/material/progress-spinner",
        "MatProgressBarModule": "@angular/material/progress-bar", "MatTooltipModule": "@angular/material/tooltip", "MatSnackBarModule": "@angular/material/snack-bar",
        "MatTableModule": "@angular/material/table", "MatSortModule": "@angular/material/sort", "MatPaginatorModule": "@angular/material/paginator",
    }

    existing_imports = re.findall(r'import\s+.*\s+from\s+[\'"](.*)[\'"]', content)
    new_imports = ""

    used_component_class_names = {info['class_name'] for info in used_components.values()}
    for imp in sorted(list(set(dependencies) - used_component_class_names)):
        if imp in angular_imports and angular_imports[imp] not in existing_imports:
             new_imports += f"import {{ {imp} }} from '{angular_imports[imp]}';\n"

    for selector, component_info in used_components.items():
        class_name = component_info['class_name']
        path_to_import_from = os.path.relpath(component_info['path'], os.path.dirname(component_path))
        path_to_import_from = path_to_import_from.replace('.ts', '')
        if not path_to_import_from.startswith('.'):
            path_to_import_from = './' + path_to_import_from

        # Check if same import already exists
        if f"'{path_to_import_from}'" not in content and f'"{path_to_import_from}"' not in content:
            new_imports += f"import {{ {class_name} }} from '{path_to_import_from}';\n"

    modified_content = new_imports + modified_content

    with open(component_path, 'w') as f:
        f.write(modified_content)

    print(f"Converted {component_path} to standalone.")


def main():
    if len(sys.argv) < 2:
        print("Please provide a directory path to scan for components.")
        return

    scan_directory = sys.argv[1]
    print(f"Scanning directory: {scan_directory}")

    all_components = {}
    component_files = []
    for root, dirs, files in os.walk(scan_directory):
        for file in files:
            if file.endswith(".component.ts"):
                path = os.path.join(root, file)
                component_files.append(path)
                selector = get_component_selector(path)
                if selector:
                    with open(path, 'r') as f:
                        content = f.read()
                        class_match = re.search(r'export class (\w+)', content)
                        if class_match:
                            all_components[selector] = {'class_name': class_match.group(1), 'path': path}

    print(f"Found {len(component_files)} component files.")

    non_standalone_files = []
    for component_file in component_files:
        with open(component_file, 'r') as f:
            if 'standalone: true' not in f.read():
                non_standalone_files.append(component_file)

    print(f"Found {len(non_standalone_files)} non-standalone component files.")

    for component_file in non_standalone_files:
        try:
            migrate_component_to_standalone(component_file, all_components)
            time.sleep(0.1)
        except Exception as e:
            print(f"Error converting {component_file}: {e}")


if __name__ == "__main__":
    main()
