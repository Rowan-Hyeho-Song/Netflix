import styled from "styled-components";
import Icon from "@components/Icon";

const Btn = styled.div`
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    padding: 0.8rem;

    &.has-icon {
        padding-left: 1.6rem;
        padding-right: 1.6rem;
    }
    &.has-label {
        padding-left: 2.4rem;
        padding-right: 2.4rem;
    }
    &.has-icon.has-label {
        padding-left: 2rem;
        padding-right: 2.4rem;
    }

    .icon {
        width: 1.3rem;
        height: 1.3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon-left {
        box-sizing: content-box;
        padding-right: 1rem;
    }
    .icon-right {
        box-sizing: content-box;
        padding-left: 1rem;
    }
`;

function Button({ className = "button", lIcon, rIcon, iAsset, label, onClick }) {
    const cls = [className];
    (lIcon || rIcon) && cls.push("has-icon");
    label && cls.push("has-label");

    return (
        <Btn className={cls.join(" ")} onClick={onClick}>
            {lIcon && (
                <div className="icon icon-left">
                    <Icon icon={lIcon} asset={iAsset} size="1.3rem" />
                </div>
            )}
            {label && <span className="label">{label}</span>}
            {rIcon && (
                <div className="icon icon-right">
                    <Icon icon={rIcon} asset={iAsset} size="1.3rem" />
                </div>
            )}
        </Btn>
    );
}

export default Button;
