import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ArticleFormProps = {
	changeStyles: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isOpen, setOpen] = useState(false);

	const handleArrowBtnClick = () => {
		setOpen((isOpen) => !isOpen);
	};

	const onClose = () => {
		setOpen(false);
	};

	const modalRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSelect = (key: keyof ArticleStateType, option: OptionType) => {
		setFormState((prevFormState) => {
			return { ...prevFormState, [key]: option };
		});
	};

	const onStylesChange = (e: React.FormEvent) => {
		props.changeStyles(formState);
		e.preventDefault();
	};

	const onClearForm = () => {
		setFormState(defaultArticleState);
		props.changeStyles(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowBtnClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={modalRef}>
				<form className={styles.form} onSubmit={onStylesChange}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						onChange={(option) => handleSelect('fontFamilyOption', option)}
						selected={formState.fontFamilyOption}
						title='шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) => handleSelect('fontSizeOption', option)}
						title='Размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						onChange={(option) => handleSelect('fontColor', option)}
						selected={formState.fontColor}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						onChange={(option) => handleSelect('backgroundColor', option)}
						selected={formState.backgroundColor}
						title='Цвет фона'></Select>
					<Select
						options={contentWidthArr}
						onChange={(option) => handleSelect('contentWidth', option)}
						selected={formState.contentWidth}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onClearForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
