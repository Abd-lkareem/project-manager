<?php

namespace App\Enums;

enum projectStatus: string
{
    // use IntercatsWithEnums;

    case ON_PROGRESS = 'on_progress';
    case COMPLETED = 'completed';
    case CANCLED = 'cancled';
}
