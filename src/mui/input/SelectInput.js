import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import FieldTitle from '../../util/FieldTitle';

/**
 * An Input component for a select box, using an array of objects for the options
 *
 * Pass possible options as an array of objects in the 'choices' attribute.
 *
 * By default, the options are built from:
 *  - the 'id' property as the option value,
 *  - the 'name' property an the option text
 * @example
 * const choices = [
 *    { id: 'M', name: 'Male' },
 *    { id: 'F', name: 'Female' },
 * ];
 * <SelectInput source="gender" choices={choices} />
 *
 * You can also customize the properties to use for the option name and value,
 * thanks to the 'optionText' and 'optionValue' attributes.
 * @example
 * const choices = [
 *    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
 *    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
 * ];
 * <SelectInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
 *
 * `optionText` also accepts a function, so you can shape the option text at will:
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
 * <SelectInput source="author_id" choices={choices} optionText={optionRenderer} />
 *
 * `optionText` also accepts a React Element, that will be cloned and receive
 * the related choice as the `record` prop. You can use Field components there.
 * @example
 * const choices = [
 *    { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
 *    { id: 456, first_name: 'Jane', last_name: 'Austen' },
 * ];
 * const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
 * <SelectInput source="gender" choices={choices} optionText={<FullNameField />}/>
 *
 * The object passed as `options` props is passed to the material-ui <SelectField> component
 */
class SelectInput extends Component {
    handleChange = (event, index, value) => this.props.input.onChange(value);

    render() {
        const { allowEmpty, input, label, choices, optionText, optionValue, options, source, elStyle, meta: { touched, error }, resource } = this.props;
        const option = React.isValidElement(optionText) ? // eslint-disable-line no-nested-ternary
            choice => React.cloneElement(optionText, { record: choice }) :
            (typeof optionText === 'function' ?
                optionText :
                choice => choice[optionText]
            );
        return (
            <SelectField
                value={input.value}
                floatingLabelText={<FieldTitle label={label} source={source} resource={resource} />}
                onChange={this.handleChange}
                autoWidth
                style={elStyle}
                errorText={touched && error}
                {...options}
            >
                {allowEmpty &&
                    <MenuItem value={null} primaryText="" />
                }
                {choices.map(choice =>
                    <MenuItem key={choice[optionValue]} primaryText={option(choice)} value={choice[optionValue]} />
                )}
            </SelectField>
        );
    }
}

SelectInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    allowEmpty: PropTypes.bool.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    elStyle: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
    options: PropTypes.object,
    optionText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
        PropTypes.element,
    ]).isRequired,
    optionValue: PropTypes.string.isRequired,
    resource: PropTypes.string,
    source: PropTypes.string,
};

SelectInput.defaultProps = {
    addField: true,
    allowEmpty: false,
    choices: [],
    options: {},
    optionText: 'name',
    optionValue: 'id',
};

export default SelectInput;
