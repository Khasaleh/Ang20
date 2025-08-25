import os
import re

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
        match = re.search(r"templateUrl:\s*'([^']*)'", content)
        if match:
            template_url = match.group(1)
            template_path = os.path.join(os.path.dirname(component_path), template_url)
            if os.path.exists(template_path):
                with open(template_path, 'r') as tf:
                    return tf.read()
    return ''

def find_used_components(template_content, all_components):
    used_selectors = []
    for selector, component_class in all_components.items():
        if f'<{selector}' in template_content:
            used_selectors.append(component_class)
    return used_selectors

def migrate_component_to_standalone(component_path, all_components):
    with open(component_path, 'r') as f:
        content = f.read()

    if 'standalone: true' in content:
        return

    # Add standalone: true
    modified_content = re.sub(r'(@Component\({)', r'\\1\n  standalone: true,', content)

    # Get template content to find used components
    template_content = get_template_content(component_path)
    used_components = find_used_components(template_content, all_components)

    # Add imports
    imports = [
        "CommonModule",
        "FormsModule",
        "ReactiveFormsModule",
        "RouterModule",
        "TranslateModule",
        "MatDialogModule",
        "MatIconModule",
        "MatFormFieldModule",
        "MatInputModule",
        "MatSelectModule",
        "MatCheckboxModule",
        "MatRadioModule",
        "MatDatepickerModule",
        "MatNativeDateModule",
        "MatSliderModule",
        "MatSlideToggleModule",
        "MatMenuModule",
        "MatSidenavModule",
        "MatToolbarModule",
        "MatListModule",
        "MatGridListModule",
        "MatCardModule",
        "MatStepperModule",
        "MatTabsModule",
        "MatExpansionModule",
        "MatButtonToggleModule",
        "MatChipsModule",
        "MatProgressSpinnerModule",
        "MatProgressBarModule",
        "MatTooltipModule",
        "MatSnackBarModule",
        "MatTableModule",
        "MatSortModule",
        "MatPaginatorModule",
        "OverlayModule",
        "PortalModule",
        "ScrollingModule",
        "DragDropModule",
        "A11yModule",
        "ClipboardModule",
        "CdkStepperModule",
        "CdkTableModule",
        "CdkTreeModule",
    ]

    imports.extend(used_components)

    imports_str = ',\\n    '.join(sorted(list(set(imports))))

    modified_content = re.sub(r'(@Component\({)', r'\\1\n  imports: [\n    ' + imports_str + '\n  ],', modified_content)

    # Add necessary imports from @angular
    angular_imports = {
        "CommonModule": "@angular/common",
        "FormsModule": "@angular/forms",
        "ReactiveFormsModule": "@angular/forms",
        "RouterModule": "@angular/router",
        "TranslateModule": "@ngx-translate/core",
        "MatDialogModule": "@angular/material/dialog",
        "MatIconModule": "@angular/material/icon",
        "MatFormFieldModule": "@angular/material/form-field",
        "MatInputModule": "@angular/material/input",
        "MatSelectModule": "@angular/material/select",
        "MatCheckboxModule": "@angular/material/checkbox",
        "MatRadioModule": "@angular/material/radio",
        "MatDatepickerModule": "@angular/material/datepicker",
        "MatNativeDateModule": "@angular/material/core",
        "MatSliderModule": "@angular/material/slider",
        "MatSlideToggleModule": "@angular/material/slide-toggle",
        "MatMenuModule": "@angular/material/menu",
        "MatSidenavModule": "@angular/material/sidenav",
        "MatToolbarModule": "@angular/material/toolbar",
        "MatListModule": "@angular/material/list",
        "MatGridListModule": "@angular/material/grid-list",
        "MatCardModule": "@angular/material/card",
        "MatStepperModule": "@angular/material/stepper",
        "MatTabsModule": "@angular/material/tabs",
        "MatExpansionModule": "@angular/material/expansion",
        "MatButtonToggleModule": "@angular/material/button-toggle",
        "MatChipsModule": "@angular/material/chips",
        "MatProgressSpinnerModule": "@angular/material/progress-spinner",
        "MatProgressBarModule": "@angular/material/progress-bar",
        "MatTooltipModule": "@angular/material/tooltip",
        "MatSnackBarModule": "@angular/material/snack-bar",
        "MatTableModule": "@angular/material/table",
        "MatSortModule": "@angular/material/sort",
        "MatPaginatorModule": "@angular/material/paginator",
        "OverlayModule": "@angular/cdk/overlay",
        "PortalModule": "@angular/cdk/portal",
        "ScrollingModule": "@angular/cdk/scrolling",
        "DragDropModule": "@angular/cdk/drag-drop",
        "A11yModule": "@angular/cdk/a11y",
        "ClipboardModule": "@angular/cdk/clipboard",
        "CdkStepperModule": "@angular/cdk/stepper",
        "CdkTableModule": "@angular/cdk/table",
        "CdkTreeModule": "@angular/cdk/tree",
    }

    existing_imports = re.findall(r'import\s+.*\s+from\s+[\'"](.*)[\'"]', content)

    new_imports = ""
    for imp in sorted(list(set(imports) - set(used_components))):
        if imp in angular_imports and angular_imports[imp] not in existing_imports:
             new_imports += f"import {{ {imp} }} from '{angular_imports[imp]}';\\n"

    for comp in used_components:
        # This is a simplification. We'd need to know the relative path to the component.
        # For now, let's assume a flat structure for simplicity.
        # A more robust solution would compute the relative path.
        comp_path = f"./{comp}.component" # This is a guess
        if comp_path not in existing_imports:
            # We need to get the actual path to the component to do a relative import.
            # This is a limitation of this simple script.
            pass

    modified_content = new_imports + modified_content

    print(f"--- {component_path}")
    print(f"+++ {component_path}")
    print(modified_content)


def main():
    all_components = {}
    component_files = []
    for root, dirs, files in os.walk("."):
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
                            all_components[selector] = class_match.group(1)

    # Filter out already standalone components
    non_standalone_files = []
    for component_file in component_files:
        with open(component_file, 'r') as f:
            if 'standalone: true' not in f.read():
                non_standalone_files.append(component_file)

    for component_file in non_standalone_files:
        migrate_component_to_standalone(component_file, all_components)


if __name__ == "__main__":
    main()
